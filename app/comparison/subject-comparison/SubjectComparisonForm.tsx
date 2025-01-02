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

export default function SubjectForm() {
  const [hallticket, setHallticket] = useState("");
  const [semester, setSemester] = useState<keyof typeof SemesterData | "">("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [regular, setRegular] = useState("");
  const [lateral, setLateral] = useState("");

  // State to store all students' results and loading hallticket for real-time feedback
  const [resultData, setResultData] = useState<Student[]>([]);

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

      // Create an array of promises for each API call
      const fetchPromises = halltickets.map(async (hallticket) => {
        const formData = new FormData();
        formData.append("hallticket", hallticket);
        formData.append("semester", semester);

        try {
          const result = await semResult(formData);
          if (result.success && result.data.Details?.Roll_No) {
            return result.data;
          }
        } catch (error) {
          console.error(`Error fetching data for hallticket ${hallticket}:`, error);
        }
        return null; // If error occurs, return null
      });

      // Wait for all promises to resolve
      const results = await Promise.all(fetchPromises);

      // Filter out null results in case of failed API calls
      const validResults = results.filter((result) => result !== null);

      // Update the state with valid results
      setResultData((prevData) => [...prevData, ...validResults]);

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
  return (
    <div>
      {loading ? (
        <div className="flex m-2 flex-col items-center justify-center">
          <Spinner className="h-12 w-12" />
          <p className="mt-4 text-lg">Loading results...</p>
          <p className="mt-4 text-lg">might take longer time</p>
          <p className="mt-4 text-lg">wait for a minute</p>
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
      <ComparisonTable students={formattedData} selectedSubject={selectedSubject}  subjects={subjects}  />
      </CardContent>
      </Card>
    </div>

      )}      
    </div>
  );
}
