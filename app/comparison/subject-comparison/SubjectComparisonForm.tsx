"use client";

import React, { useMemo, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateHallTicket } from "@/lib/hallgeneration";
import { semResult } from "@/app/actions/students";
import { Spinner } from "@/components/ui/spinner";
import { SubjectDropdown } from "./SubjectDropdown";
import { ComparisonTable } from "./ComparisonTable";
import { formatStudentData, FormattedData, Student } from "@/lib/formatData";
import colleges from "@/lib/college";
import branches from "@/lib/branch";

// Define semester options
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

export default function SubjectForm() {
  const [hallticket, setHallticket] = useState("");
  const [semester, setSemester] = useState<keyof typeof SemesterData | "">("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [regular, setRegular] = useState("");
  const [lateral, setLateral] = useState("");
  
    const [loadingTickets, setLoadingTickets] = useState<Set<string>>(new Set());


  // State to store all students' results
  const [resultData, setResultData] = useState<Student[]>([]);

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

  // Zod validation for the form
  const formSchema = z.object({
    hallticket: z
      .string()
      .length(10, { message: "Hall ticket must be exactly 10 characters long" })
      .regex(/^[0-9A-Za-z]+$/, {
        message: "Hall ticket can only contain alphanumeric characters",
      }),
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

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading state

    if (validateForm()) {
      setResultData([]); // Clear previous results

      const basePart = hallticket.slice(0, 8);
      const halltickets = generateHallTicket(basePart, regular, lateral);

      // Results array to accumulate the fetched results
      const results: Student[] = [];

      // Create an array of promises for each API call
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
            if (result.success && result.data.Details?.Roll_No) {
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

      // Wait for all promises to resolve
      await Promise.all(fetchPromises);

      // Filter out null results in case of failed API calls
      const validResults = results.filter((result) => result !== null);

      // Update the state with valid results
      setResultData(validResults);

      setLoading(false); // Stop loading state after all results are fetched
      setShowForm(false); // Hide form after submission
    } else {
      setLoading(false); // Stop loading in case of validation failure
    }
  };

  // Format the data only if there is resultData
  const { subjects, formattedData }: FormattedData = resultData && resultData.length > 0 ? formatStudentData(resultData) : { subjects: [], formattedData: [] };
  const [selectedSubject, setSelectedSubject] = useState(subjects.length > 0 ? subjects[0].code : "");
  const collegeCode = hallticket.slice(2, 4) as keyof typeof colleges;
  const courseCode = hallticket.slice(6, 8) as keyof typeof branches;
  const collegeName = colleges[collegeCode] || "Unknown College";
  const courseName = branches[courseCode] || "Unknown Course";
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
                  <Label htmlFor="hallticket">Hallticket of a Student <span className="text-red-700">*</span></Label>
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
                  <Label htmlFor="semester">Semester <span className="text-red-700">*</span></Label>
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
                    <Label htmlFor="regular">Regular <span className="text-red-700">*</span></Label>
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
                      className={`${semester == "1-1" || semester == "1-2" ? "hidden" : ""}`}
                      value={lateral}
                      onChange={(e) => setLateral(e.target.value.toUpperCase())}
                      placeholder="EX: 34"
                    />
                  </div>
                </div>
                <div className="text-xs text-red-500"> Note: Enter the last student&apos;s number like <strong>20XXXXXXA9</strong> then <strong>A9</strong> otherwise <strong>0</strong></div>
                {/* Submit Button */}
                <Button
                  type="submit"
                  className="mt-2 w-full"
                  disabled={loading}
                >
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="container mx-auto py-10 px-2">
          <Card className="p-4">
            <CardTitle className="mb-2 border-b-2 text-center">
              <p className="text-lg font-semibold">{collegeName}</p>
              <p className="text-lg font-semibold">{courseName}</p>
              <p className="text-lg font-semibold">{semester ? SemesterData[semester] : "Unknown Semester"}</p>
            </CardTitle>
            
            <CardContent>
              <div className="mb-5 border-b-2 m-4 p-2">
                <SubjectDropdown subjects={subjects} onSubjectChange={setSelectedSubject} />
              </div>
              <ComparisonTable students={formattedData} selectedSubject={selectedSubject} subjects={subjects} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
