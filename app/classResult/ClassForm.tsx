"use client"
import React, { useState } from "react";
import {set, z } from "zod";
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
import ClassTable from "./ClassTable";
import { generateHallTicket } from "@/lib/hallgeneration";
import colleges from "@/lib/college";
import branches from "@/lib/branch";
import { Download } from "lucide-react";

// Define types for the data we expect
interface StudentResult {
  Details: {
    NAME: string;
    Roll_No: string;
    FATHER_NAME: string;
    COLLEGE_CODE: string;
  };
  Result: Record<string, { name: string; grade: string; total: string }>;
}
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

export default function ClassForm() {
  const [hallticket, setHallticket] = useState("");
  const [semester, setSemester] = useState<keyof typeof SemesterData | "">("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [regular, setRegular] = useState("");
  const [lateral, setLateral] = useState("");

  // State to store all students' results and loading hallticket for real-time feedback
  const [resultData, setResultData] = useState<StudentResult[]>([]);
  const [loadingHallTicket, setLoadingHallTicket] = useState<string | null>(null);
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
  // const validate = ()=>{
  //   if (validateForm()) {
  //     setLoading(true);
  //   }
  // }

  // Form submit handler
  const handleSubmit = async (formData: FormData) => {
    
    
    const basehallticket = formData.get("hallticket") || "";
    const regular = formData.get("regular");
    let lateral = formData.get("lateral");
    if (!lateral) lateral = "0"; 
    if (validateForm()) {
      setLoading(true);
      const basePart = basehallticket.slice(0, 8);
      const halltickets = generateHallTicket(basePart, regular, lateral);

      // Fetch results for each hallticket and store them incrementally in resultData state
      for (const hallticket of halltickets) {
        const localStorageKey = `${hallticket}_${semester}`;
        setLoadingHallTicket(hallticket); // Set current hallticket as loading

        const cachedData = getDataFromLocalStorage(localStorageKey);
        if (cachedData) {
          // Check if the cached data is not already in resultData
          if (!resultData.some(data => data.Details.Roll_No === cachedData.Details.Roll_No)) {
            setResultData((prevData) => [...prevData, cachedData]);
          }
          setShowForm(false);
        } else {
          const formData = new FormData();
          formData.append("hallticket", hallticket);
          formData.append("semester", semester);
          const result = await semResult(formData);
        
          if (result.success) {
            if (result.data.Details.Roll_No) {
              storeDataWithExpiration(localStorageKey, result.data);
              // Check if the new result is not already in resultData
              if (!resultData.some(data => data.Details.Roll_No === result.data.Details.Roll_No)) {
                setResultData((prevData) => [...prevData, result.data]);
              }
              setShowForm(false);
            }
          } else {
            setLoading(true);
          }
        }
      }        
      setLoading(false);
       // Hide form after submission
       // Stop loading state after all results are fetched
      setLoadingHallTicket(null); // Reset current hallticket loading indicator
    }
  };
  const collegeCode = hallticket.slice(2, 4) as keyof typeof colleges;
  const courseCode = hallticket.slice(6, 8) as keyof typeof branches;
  const collegeName = colleges[collegeCode] || "Unknown College";
  const courseName = branches[courseCode] || "Unknown Course";
  console.log(resultData)
  
  return (
    <div>
      {showForm ? (
        <div className="flex flex-col justify-center items-center m-2">
          <Card className="mx-auto max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Class Result</CardTitle>
              <CardDescription>
                Enter one Student&apos;s <strong>Details</strong> below to get class results.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={handleSubmit} className="grid gap-4">
                {/* HallTicket Input */}
                <div className="grid gap-2">
                  <Label htmlFor="hallticket">Hallticket of a Student  <span className="text-red-700">*</span></Label>
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
                  <Label htmlFor="semester">Semester  <span className="text-red-700">*</span></Label>
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
                  className="mt-2"
                  disabled={loading} // Disable button while loading
                >
                  {loading ? "Finding Result..." : "Find Result"}
                </Button>
              </form>
              <div className="text-right text-base text-[12px] font-bold mt-4">
             by Bishal Pathak &#128420;
           </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-end mb-4 mr-2 print:hidden">
                  <Button onClick={() => window.print()} variant="secondary">
                    <Download className="mr-2  h-4 w-4" /> Download Result
                  </Button>
                </div>
          <div >
          <Card className="w-full  py-2 my-2 overflow-x-hidden" >
              <CardContent>
                <div className=" gap-2 px-2">
                  <div className="flex gap-4 items-center">
                    <p className="text-[40%] md:text-md lg:text-lg font-medium text-muted-foreground text-center">College Name : </p>
                    <p className="text-[40%] md:text-md lg:text-lg font-semibold text-center">{collegeName}</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <p className="text-[40%] md:text-md lg:text-lg font-medium text-muted-foreground text-center">Course Name : </p>
                    <p className="text-[40%] md:text-md lg:text-lg font-semibold text-center">{courseName}</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <p className="text-[40%] md:text-md lg:text-lg font-medium text-muted-foreground text-center">Year : </p>
                    <p className="text-[40%] md:text-md lg:text-lg font-semibold text-center">{semester ? SemesterData[semester] : "Unknown Semester"}</p>
                  </div>
                  
                </div>
                </CardContent>
              </Card>
          {loadingHallTicket && <p className="fixed bottom-5 right-5 z-50 bg-slate-900 rounded-2xl text-white p-4">Loading  {loadingHallTicket}</p>}
          <div>{resultData.map((data: any,index:number) => {

            return (
              <ClassTable key={index} result={data} />
            );
          })}</div>
          </div>
        </div>
      )}
    </div>
  );
}