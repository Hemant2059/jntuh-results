"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";

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

export function AcademicForm() {
  const [hallticket, setHallticket] = useState("");
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
              onChange={(e) => setHallticket(e.target.value.toUpperCase)}
              placeholder="20XXXXXX01"
              required
            />
          </div>
          <Button>
            <Link href={`/academic/${hallticket}`} className="w-full">
              Find Result
            </Link>
          </Button>
        </div>
        <div className="mt-4 text-right text-sm font-bold">
          Made by Bishal Pathak{" "}
        </div>
      </CardContent>
    </Card>
  );
}
