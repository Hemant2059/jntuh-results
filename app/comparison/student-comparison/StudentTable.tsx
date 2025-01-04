
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Student } from "@/lib/formatData";
import calculateSGPA from "@/lib/sgpa-cal";
import React, { useState } from "react";

import { Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ComparisonTableProps = {
  students: Student[];
};


function getInitials(input: string): string {
  // Define the words to exclude
  const excludeWords = new Set(['AND']);

  // Split the input string into words
  const words = input.split(' ');

  // Check if the input is a single word
  if (words.length === 1) {
      // Return the first four characters of the single word
      return words[0].substring(0, 4).toUpperCase();
  }

  // Map through the words and get the first letter of each, excluding specified words
  const initials = words.map(word => {
      if (excludeWords.has(word)) {
          return ''; // Exclude the word
      }
      if (word === "I") {
        return " 1"; // Return ' 1' for 'I'
    } else if (word === "IT") {
        return " 2"; // Return ' 2' for 'IT'
    } else if (word === 'LAB') {
        return ' Lab'; // Return ' Lab' for 'LAB'
    } else {
        return word.charAt(0).toUpperCase(); // Default case: return the first letter
    }// Keep LAB intact
  }).filter(Boolean); // Remove empty strings from the array

  // Join the initials into a string
  return initials.join('');
}

export function StudentComparisonTable({ students }: ComparisonTableProps) {
  if (students.length === 0 || !students[0].Result) {
    return <div>No students data available</div>;
  }

  const subjectCodes = Object.keys(students[0].Result);

  // State to track sorting direction
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "ascending" | "descending" }>({
    key: "Roll_No",
    direction: "ascending",
  });

  // Sorting function
  const sortedStudents = [...students].sort((a, b) => {
    const { key, direction } = sortConfig;
    let aValue, bValue;

    if (key === "Roll_No") {
      aValue = a.Details.Roll_No;
      bValue = b.Details.Roll_No;
    } else if (key === "SGPA") {
      aValue = calculateSGPA(a.Result, a.Details.Roll_No);
      bValue = calculateSGPA(b.Result, b.Details.Roll_No);
    } else {
      aValue = a.Result[key]?.grade;
      bValue = b.Result[key]?.grade;
    }

    if (aValue < bValue) {
      return direction === "ascending" ? -1 : 1;
    }
    if (aValue > bValue) {
      return direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  // Handle header click to sort
  const handleSort = (key: string) => {
    setSortConfig((prevState) => {
      const isAscending = prevState.key === key && prevState.direction === "ascending";
      return {
        key,
        direction: isAscending ? "descending" : "ascending",
      };
    });
  };

  // Function to render the sort icon
  const getSortIcon = (key: string) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? " ▲" : " ▼";
    }
    return "";
  };

  return (
    <div className="w-full mt-4 py-4">
      <div className="flex justify-end mb-4 mr-2 print:hidden">
        <Button onClick={() => window.print()} variant="secondary">
          <Download className="mr-2  h-4 w-4" /> Download Result
        </Button>
      </div>
      <div >
        <Card >
          <CardContent>
            {subjectCodes.map((subCode)=>(
              <React.Fragment key={subCode}>
              <div
                onClick={() => handleSort(subCode)}
                style={{ cursor: "pointer" }}
                className=" text-left"
              >
                <span className="font-bold text-[50%] md:text-[100%]">{getInitials(students[0].Result[subCode].name)}</span> = <span className="mx-4 text-[50%] md:text-[100%]"> {students[0].Result[subCode].name}</span>
              </div>
            </React.Fragment>
            ))}
          </CardContent>
        </Card>
        <Card className="mt-2">
        <Table className="text-[30%] sm:text-[45%] md:text-[60%] lg:text-[100%]">
          <TableHeader>
            <TableRow>
              <TableHead
                onClick={() => handleSort("Roll_No")}
                style={{ cursor: "pointer" }}
              >
                Roll No {getSortIcon("Roll_No")}
              </TableHead>
              {subjectCodes.map((subCode) => (
                <React.Fragment key={subCode}>
                  <TableHead
                    onClick={() => handleSort(subCode)}
                    style={{ cursor: "pointer" }}
                    className=" text-center"
                  >
                    {getInitials(students[0].Result[subCode].name)}{getSortIcon(subCode)}
                  </TableHead>
                </React.Fragment>
              ))}
              <TableHead
                onClick={() => handleSort("SGPA")}
                style={{ cursor: "pointer" }}
              >
                SGPA {getSortIcon("SGPA")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedStudents.map((student) => (
              <TableRow key={student.Details.Roll_No}>
                <TableCell>{student.Details.Roll_No}</TableCell>
                {subjectCodes.map((subCode) => {
                  const subject = student.Result[subCode];
                  return (
                    <React.Fragment key={subCode}>
                      <TableCell className="text-center">{subject.grade}</TableCell>
                    </React.Fragment>
                  );
                })}
                <TableCell>{calculateSGPA(student.Result, student.Details.Roll_No)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </Card>
      </div>
    </div>
  );
}
