"use client";
import React, { useState, useMemo } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateHallTicket } from "@/lib/hallgeneration";
import PerformanceTable from "./PerformanceTable";
import { semResult } from "@/app/actions/students";
import { Spinner } from "@/components/ui/spinner";

// Types for the data we expect
interface StudentResult {
  Details: {
    NAME: string;
    Roll_No: string;
    FATHER_NAME: string;
    COLLEGE_CODE: string;
  };
  Result: Record<string, { name: string; grade: string; total: string }>;
}

// Semester options
const SemesterData = {
  "1-1": "I Year I Semester",
  "1-2": "I Year II Semester",
  "2-1": "II Year I Semester",
  "2-2": "II Year II Semester",
  "3-1": "III Year I Semester",
  "3-2": "III Year II Semester",
  "4-1": "IV Year I Semester",
  "4-2": "IV Year II Semester",
};

// Expiration duration in milliseconds (e.g., 24 hours)
const EXPIRATION_DURATION = 24 * 60 * 60 * 1000;

export default function ClassPerformanceForm() {
  const [hallticket, setHallticket] = useState<string>("");
  const [semester, setSemester] = useState<keyof typeof SemesterData | "">("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [regular, setRegular] = useState<string>("");
  const [lateral, setLateral] = useState<string>("");
  const [resultData, setResultData] = useState<StudentResult[]>([]);
  const [loadingTickets, setLoadingTickets] = useState<Set<string>>(new Set());

  // Zod validation schema
  const formSchema = z.object({
    hallticket: z
      .string()
      .length(10, { message: "Hall ticket must be exactly 10 characters long" })
      .regex(/^[0-9A-Za-z]+$/, { message: "Hall ticket can only contain alphanumeric characters" }),
    semester: z.string().min(1, { message: "Semester is required" }),
  });

  // Form validation function
  const validateForm = () => {
    const formData = { hallticket, semester };
    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const errorMessages: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          errorMessages[error.path[0]] = error.message;
        }
      });
      setErrors(errorMessages);
      return false;
    }
    setErrors({});
    return true;
  };

  // Store data with expiration date in localStorage
  const storeDataWithExpiration = (key: string, data: any) => {
    const now = new Date().getTime();
    const item = {
      data,
      expiration: now + EXPIRATION_DURATION,
    };
    localStorage.setItem(key, JSON.stringify(item));
  };

  // Get data from localStorage and check expiration
  const getDataFromLocalStorage = (key: string) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    const now = new Date().getTime();
    if (now > item.expiration) {
      localStorage.removeItem(key); // Remove expired item
      return null; // Data has expired
    }

    return item.data; // Return valid data
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (validateForm()) {
      const basePart = hallticket.slice(0, 8);
      const halltickets = generateHallTicket(basePart, regular, lateral);

      // Collect promises to fetch results in parallel
      const results: StudentResult[] = [];
      const fetchPromises = halltickets.map(async (hallticket) => {
        const localStorageKey = `${hallticket}_${semester}`;
        const cachedData = getDataFromLocalStorage(localStorageKey);

        // Mark the hallticket as loading
        setLoadingTickets((prev) => new Set(prev).add(hallticket));

        if (cachedData) {
          // If data is found in localStorage and not expired, use it
          results.push(cachedData);
        } else {
          // Fetch from API if not in cache or data has expired
          const formData = new FormData();
          formData.append("hallticket", hallticket);
          formData.append("semester", semester);

          try {
            const result = await semResult(formData);
            if (result.success && result.data.Details.Roll_No) {
              storeDataWithExpiration(localStorageKey, result.data); // Cache the result with expiration
              results.push(result.data);
            }
          } catch (error) {
            console.error(`Error fetching data for hallticket ${hallticket}:`, error);
          }
        }

        // Mark the hallticket as done (not loading)
        setLoadingTickets((prev) => {
          const updated = new Set(prev);
          updated.delete(hallticket);
          return updated;
        });
      });

      // Wait for all the data fetching to complete
      await Promise.all(fetchPromises);
      setResultData(results); // Update state after all data is fetched
      setLoading(false);
      setShowForm(false);
    } else {
      setLoading(false);
    }
  };

  // Memoize the list of loading tickets
  const loadingMessages = useMemo(() => {
    return Array.from(loadingTickets).map((ticket) => (
      <p key={ticket} className="text-sm text-gray-500">
        Loading result for hallticket {ticket}...
      </p>
    ));
  }, [loadingTickets]);

  return (
    <div>
      {loading ? (
        <div className="flex h-screen flex-col items-center justify-center mt-20">
          <Spinner className="h-12 w-12" />
          <p className="mt-4 text-lg">Loading results...</p>
          <div className="mt-4">{loadingMessages}</div>
        </div>
      ) : showForm ? (
        <div className="flex h-screen flex-col justify-center items-center">
          <Card className="mx-auto max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Class Result</CardTitle>
              <CardDescription>
                Enter one Student&apos;s <strong>Details</strong> below to get class results.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-4">
                {/* HallTicket Input */}
                <div className="grid gap-2">
                  <Label htmlFor="hallticket">
                    Hallticket of a Student <span className="text-red-700">*</span>
                  </Label>
                  <Input
                    id="hallticket"
                    type="text"
                    name="hallticket"
                    value={hallticket}
                    onChange={(e) => setHallticket(e.target.value.toUpperCase())}
                    placeholder="20XXXXXX01"
                    required
                  />
                  {errors.hallticket && (
                    <span className="text-red-500 text-sm">{errors.hallticket}</span>
                  )}
                </div>

                {/* Semester Selection */}
                <div className="grid gap-2">
                  <Label htmlFor="semester">
                    Semester <span className="text-red-700">*</span>
                  </Label>
                  <Select onValueChange={(value) => setSemester(value as keyof typeof SemesterData)} name="semester">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>SEMESTER </SelectLabel>
                        {Object.entries(SemesterData).map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.semester && (
                    <span className="text-red-500 text-sm">{errors.semester}</span>
                  )}
                </div>

                {/* Regular and Lateral Entry Inputs */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="regular">
                      Regular <span className="text-red-700">*</span>
                    </Label>
                    <Input
                      id="regular"
                      type="text"
                      name="regular"
                      value={regular}
                      onChange={(e) => setRegular(e.target.value.toUpperCase())}
                      placeholder="EX: A7"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lateral">Lateral Entry</Label>
                    <Input
                      id="lateral"
                      type="text"
                      name="lateral"
                      className={`${semester === "1-1" || semester === "1-2" ? "hidden" : ""}`}
                      value={lateral}
                      onChange={(e) => setLateral(e.target.value.toUpperCase())}
                      placeholder="EX: 34"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="mt-2 w-full"
                  disabled={loading} // Disable button while loading
                >
                  {loading ? (
                    <>
                      <Spinner className="mr-2 h-4 w-4" />
                      Finding Result...
                    </>
                  ) : (
                    "Find Result"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div>{resultData.length > 0 && <PerformanceTable classData={resultData} />}</div>
      )}
    </div>
  );
}
