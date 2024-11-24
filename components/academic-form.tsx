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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Define Zod schema for Hallticket
const hallticketSchema = z.string().regex(/^[0-9A-Z]{10}$/, {
  message: "Hallticket must be enter",
});

export function AcademicForm() {
  const [hallticket, setHallticket] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (value: string) => {
    const uppercasedValue = value.toUpperCase();
    setHallticket(uppercasedValue);

    // Validate the hallticket
    try {
      hallticketSchema.parse(uppercasedValue); // Validates against the schema
      setError(""); // Clear the error if valid
    } catch (e) {
      setError((e as z.ZodError).errors[0]?.message || "Invalid hallticket"); // Display the first error message
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Result</CardTitle>
        <CardDescription>
          Enter your <strong>Hallticket</strong> below to get your result
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="hallticket">HallTicket</Label>
            <Input
              id="hallticket"
              type="text"
              value={hallticket}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="20E41A05C9"
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <Button disabled={!!error || !hallticket}>
            <Link href={`/academic/${hallticket}`} className="w-full">
              Find Result
            </Link>
          </Button>
        </div>
        <div className="mt-4 text-right text-sm font-bold">
          Made by Bishal Pathak
        </div>
      </CardContent>
    </Card>
  );
}
