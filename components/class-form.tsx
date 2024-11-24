"use client";
import Link from "next/link";
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

// Zod Schema for Validation
const formSchema = z.object({
  hallticket: z
    .string()
    .length(10, { message: "Hall ticket must be exactly 10 characters long" })
    .regex(/^[0-9A-Za-z]+$/, {
      message: "Hall ticket can only contain alphanumeric characters",
    }),
  semester: z.string().min(1, { message: "Semester is required" }),
  regular: z
    .string()
    .regex(/^[A-Za-z0-9]+$/, { message: "Invalid input for regular students" }),
  lateral: z
    .string()
    .regex(/^[A-Za-z0-9]+$/, { message: "Invalid input for lateral students" }),
});

export function ClassForm() {
  const [hallticket, setHallticket] = useState("");
  const [semester, setSemester] = useState("");
  const [regular, setRegular] = useState("");
  const [lateral, setLateral] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const formData = { hallticket, semester, regular, lateral };
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Validation passed; proceed to navigate.
      window.location.href = `/classresult/${hallticket}?sem=${semester}&r=${regular}&l=${lateral}`;
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Class Result</CardTitle>
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
            <Select onValueChange={(value) => setSemester(value)}>
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

          {/* Regular Students */}
          <div className="grid gap-2">
            <Label htmlFor="regular">Regular Students</Label>
            <Input
              id="regular"
              type="text"
              value={regular}
              onChange={(e) => setRegular(e.target.value.toUpperCase())}
              placeholder="Enter last student roll number like C3"
              required
            />
            {errors.regular && (
              <span className="text-red-500 text-sm">{errors.regular}</span>
            )}
          </div>

          {/* Lateral Students */}
          <div className="grid gap-2">
            <Label htmlFor="lateral">
              Lateral Students{" "}
              <span className="text-sm text-gray-500">(Enter 0 if none)</span>
            </Label>
            <Input
              id="lateral"
              type="text"
              value={lateral}
              onChange={(e) => setLateral(e.target.value.toUpperCase())}
              placeholder="Enter last student roll number like 44"
              required
            />
            {errors.lateral && (
              <span className="text-red-500 text-sm">{errors.lateral}</span>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="mt-2">
            Find Result
          </Button>
        </form>

        {/* Footer */}
        <div className="text-right text-base text-[12px] font-bold mt-4">
          by Bishal Pathak &#128420;
        </div>
      </CardContent>
    </Card>
  );
}
