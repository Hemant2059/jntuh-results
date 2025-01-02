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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { academicResult } from "../actions/students";
import AcademicTable from "./AcademicTable";

// Zod schema for form validation
const formSchema = z.object({
  hallticket: z
    .string()
    .length(10, { message: "Hall ticket must be exactly 10 characters long" })
    .regex(/^[0-9A-Za-z]+$/, {
      message: "Hall ticket can only contain alphanumeric characters",
    }),
});

export default function AcademicForm() {
  const [hallticket, setHallticket] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false); // Track form submission state
  const [showForm, setShowForm] = useState(true);
  const [result, setResult] = useState<any>(null);

  // Form validation function
  const validateForm = () => {
    const formData = { hallticket };
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
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (validateForm()) {
      setLoading(true); // Set loading to true when the form starts submitting
      // After successful validation, navigate with query parameters
      const result = await academicResult(formData);
      if (result.success) {
        setResult(result.data);
        setShowForm(false);
      } else {
        setShowForm(true);
      }
      setLoading(false); // Set loading to false after the request is done
    }
  };

  return (
    <div>
      {showForm ? (
        <div className="flex m-2 flex-col justify-center items-center">
          <Card className="mx-auto max-w-sm ">
            <CardHeader>
              <CardTitle className="text-2xl">Academic Result</CardTitle>
              <CardDescription>
                Enter your <strong>Details</strong> below to get your result.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-4">
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

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="mt-2"
                  disabled={loading} // Disable button while loading
                >
                  {loading ? (
                    <div className="loader">Finding Result...</div> // You can use a spinner here
                  ) : (
                    "Find Result"
                  )}
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
          {/* Display result */}
          <AcademicTable result={result} />
        </div>
      )}
    </div>
  );
}
