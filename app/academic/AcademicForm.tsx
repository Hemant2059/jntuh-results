// AcademicForm.tsx
"use client";
import React, { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { academicResult } from "../actions/students";
import AcademicTable from "./AcademicTable";

const formSchema = z.object({
  hallticket: z
    .string()
    .length(10, { message: "Hall ticket must be exactly 10 characters long" })
    .regex(/^[0-9A-Za-z]+$/, { message: "Hall ticket can only contain alphanumeric characters" }),
});

export default function AcademicForm() {
  const [hallticket, setHallticket] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [result, setResult] = useState<any>(null);

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      setLoading(true);
      const cachedResult = localStorage.getItem(hallticket);
      if (cachedResult) {
        const parsedCache = JSON.parse(cachedResult);
        const isExpired = new Date().getTime() > parsedCache.expiry;

        if (!isExpired) {
          setResult(parsedCache.data);
          setShowForm(false);
          setLoading(false);
          return;
        } else {
          localStorage.removeItem(hallticket);
        }
      }

      const formData = new FormData(event.currentTarget);
      const result = await academicResult(formData);
      if (result.success) {
        if ('data' in result) {
          setResult(result.data);
          const cacheData = {
            data: result.data,
            expiry: new Date().getTime() + 24 * 60 * 60 * 1000, // 1 day expiry
          };
          localStorage.setItem(hallticket, JSON.stringify(cacheData));
        }
        setShowForm(false);
      } else {
        setErrors({ hallticket: result.error ?? "An unknown error occurred" });
        setShowForm(true);
      }
      setLoading(false);
    }
  };

  return (
    <div>
      {showForm ? (
        <div className="flex m-2 flex-col justify-center items-center">
          <Card className="mx-auto max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Academic Result</CardTitle>
              <CardDescription>Enter your <strong>Details</strong> below to get your result.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-4">
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
                <Button type="submit" className="mt-2" disabled={loading}>
                  {loading ? <div className="loader">Finding Result...</div> : "Find Result"}
                </Button>
              </form>
              <div className="text-right text-base text-[12px] font-bold mt-4">by Bishal Pathak &#128420;</div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <AcademicTable result={result} />
      )}
    </div>
  );
}
