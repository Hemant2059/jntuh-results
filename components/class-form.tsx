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

export function ClassForm() {
  const [hallticket, setHallticket] = useState("");
  const [semester, setSemester] = useState("");
  const [regular, setRegular] = useState("");
  const [lateral, setLateral] = useState("");
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Class Result</CardTitle>
        <CardDescription>
          Enter your <strong>Details</strong> below to get your result
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="hallticket">HallTicket</Label>
            <Input
              id="hallticket"
              type="text"
              onChange={(e) => setHallticket(e.target.value.toUpperCase())}
              placeholder="20XXXXXX01"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="hallticket">HallTicket</Label>
            <Select onValueChange={(e) => setSemester(e)}>
              <SelectTrigger className="">
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
          </div>
          <div className="grid gap-2">
            <Label htmlFor="hallticket">Regular Students</Label>
            <Input
              id="hallticket"
              type="text"
              onChange={(e) => setRegular(e.target.value.toUpperCase())}
              placeholder="Enter last student roll number like C3"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="hallticket">
              Lateral Students ("Put 0 if there is no student")
            </Label>
            <Input
              id="hallticket"
              type="text"
              onChange={(e) => setLateral(e.target.value.toUpperCase())}
              placeholder="Enter last student roll number like 44"
              required
            />
          </div>
          <Button>
            <Link
              href={`/classresult/${hallticket}?sem=${semester}&r=${regular}&l=${lateral}`}
              className="w-full"
            >
              Find Result
            </Link>
          </Button>
        </div>
        <div className="text-right text-base text-[12px] font-bold">
          by Bishal Pathak &#128420;
        </div>
      </CardContent>
    </Card>
  );
}
