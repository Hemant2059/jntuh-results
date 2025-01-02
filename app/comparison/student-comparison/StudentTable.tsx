import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Student } from "@/lib/formatData";
import calculateSGPA from "@/lib/sgpa-cal";
import React, { useState } from "react";

type ComparisonTableProps = {
  students: Student[];
};

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
      <div>
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
                  >
                    {subCode} {getSortIcon(subCode)}
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
                      <TableCell>{subject.grade}</TableCell>
                    </React.Fragment>
                  );
                })}
                <TableCell>{calculateSGPA(student.Result, student.Details.Roll_No)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
