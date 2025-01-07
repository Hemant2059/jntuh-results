"use client";
import React, { useState } from "react";
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
import { semResult } from "../actions/students";
import SemesterTable from "./SemesterTable";

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

// Zod schema for form validation
const formSchema = z.object({
  hallticket: z
    .string()
    .length(10, { message: "Hall ticket must be exactly 10 characters long" })
    .regex(/^[0-9A-Za-z]+$/, {
      message: "Hall ticket can only contain alphanumeric characters",
    }),
  semester: z.string().min(1, { message: "Semester is required" }),
});

export default function SemesterForm() {
  const [hallticket, setHallticket] = useState<string>("");
  const [semester, setSemester] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false); // Track form submission state
  const [showForm, setShowForm] = useState<boolean>(true);
  const [result, setResult] = useState<any>(null);

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

  // Validate the form inputs
  const validateForm = (): boolean => {
    const formData = { hallticket, semester };
    const parsedResult = formSchema.safeParse(formData);
    if (!parsedResult.success) {
      const errorMessages: Record<string, string> = {};
      parsedResult.error.errors.forEach((error) => {
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
  const handleSubmit = async (formData: FormData) => {
    const hallticket = formData.get("hallticket")
    const semester = formData.get("semester")
    const localStorageKey = `${hallticket}_${semester}`;
    if (validateForm()) {
      setLoading(true);
      const cachedData = getDataFromLocalStorage(localStorageKey);
        if (cachedData) {
          setResult(cachedData)
          setShowForm(false);
        }
        else{
      const result = await semResult(formData);
      if (result.success) {
        storeDataWithExpiration(localStorageKey, result.data);
        setResult(result.data);
        setShowForm(false);
      } else {
        setShowForm(true);
      }
      setLoading(false);
    }}
  };

  return (
    <div>
      {showForm ? (
        <div className="flex m-2 flex-col justify-center items-center">
          <Card className="mx-auto max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Semester Result</CardTitle>
              <CardDescription>
                Enter your <strong>Details</strong> below to get your result.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(new FormData(e.target as HTMLFormElement));
                }}
                className="grid gap-4"
              >
                {/* HallTicket Input */}
                <div className="grid gap-2">
                  <Label htmlFor="hallticket">Hall Ticket</Label>
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
                  <Label htmlFor="semester">Semester</Label>
                  <Select
                    onValueChange={(value) => setSemester(value)}
                    name="semester"
                    value={semester}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>SEMESTER</SelectLabel>
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

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="mt-2"
                  disabled={loading} // Disable button while loading
                >
                  {loading ? "Finding Result..." : "Find Result"}
                </Button>
              </form>

              {/* Footer */}
              <div className="text-right text-base text-[12px] font-bold mt-4">
                by Bishal Pathak &#128420;
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div>
          <SemesterTable result={result} semester={SemesterData[semester as keyof typeof SemesterData]} />
        </div>
      )}
    </div>
  );
}
