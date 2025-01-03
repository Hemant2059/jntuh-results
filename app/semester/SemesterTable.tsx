import React from "react";
import calculateSGPA from "@/lib/sgpa-cal";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import colleges from "@/lib/college";
import branches from "@/lib/branch";
import { Button } from "@/components/ui/button";

import { Download } from 'lucide-react';




interface ResultDetails {
  NAME: string;
  Roll_No: string;
  COLLEGE_CODE: string;
  FATHER_NAME: string;
}

interface SubjectResult {
  name: string;
  internal: number;
  external: number;
  total: number;
  grade: string;
  credits: number;
}

interface Resultresult {
  Details: ResultDetails;
  Result: { [subjectCode: string]: SubjectResult };
}

interface TableClassProps {
  result: Resultresult;
  semester: string;
}
const getGradeColor = (grade: string): string => {
  const gradeColors: { [key: string]: string } = {
    'O': 'bg-green-700',      // Outstanding - A strong green to signify excellence
    'A+': 'bg-green-600',     // Very good - A slightly softer green
    'A': 'bg-green-500',      // Good - A balanced, solid green
    'B+': 'bg-blue-500',      // Slightly above average - Blue is a good neutral color for positive performance
    'B': 'bg-blue-400',       // Average - A more neutral blue shade
    'C+': 'bg-yellow-400',    // Slightly below average - A bright yellow to signify moderate concern
    'C': 'bg-yellow-300',     // Below average - Softer yellow for caution
    'D': 'bg-orange-400',     // Just passing - Orange color represents a warning or lower performance
    'F': 'bg-red-600'         // Failing - A deep red to indicate failure
  };
  return gradeColors[grade] || 'bg-gray-400';
};

const SemesterTableComponent: React.FC<TableClassProps> = ({ result , semester}) => {
  if (!result || !result.Details || !result.Result) {
    return <div>No result available</div>;
  }
  const name = result.Details.NAME || "Unknown";
  const rollno = result.Details.Roll_No || "Unknown";
  const collegeCode = result.Details.COLLEGE_CODE as keyof typeof colleges;
  const collegeName = colleges[collegeCode] || "Unknown";
  const courseCode = result.Details.Roll_No.slice(6, 8) as keyof typeof branches;
  const branch = branches[courseCode] || "Unknown";


  return (
    <div className="max-w-4xl mx-auto mt-20">
      <div className="flex justify-end mb-4 mr-2 print:hidden">
              <Button onClick={() => window.print()} variant="secondary">
                <Download className="mr-2  h-4 w-4" /> Download Result
              </Button>
            </div>
    <Card className="w-full  my-4 py-4">
    <CardContent >
      <CardTitle className="text-lg md:text-xl lg:text-2xl font-bold text-center mb-4 border-b-2">
        <div>{collegeName}</div>
        <div className="text-base text-gray-600">{branch}</div>
        <div className="text-base text-gray-600">{semester}</div>
      </CardTitle>
      <div className="grid grid-cols-5  gap-2 mb-3 px-2 pb-0">
        <div className="col-span-2">
          <p className="text-[40%] md:text-base text-center  font-medium text-muted-foreground">Name</p>
          <p className="text-[40%] md:text-base text-center  font-semibold">{name === "BISHAL PATHAK" ? "DHAYLE BHAI 😂" : name}</p>
        </div>
        <div>
          <p className="text-[40%] md:text-base text-center  font-medium text-muted-foreground">Hall Ticket</p>
          <p className="text-[40%] md:text-base text-center  font-semibold">{result.Details.Roll_No}</p>
        </div>        
        <div className="col-span-2">
          <p className="text-[40%] md:text-base text-center  font-medium text-muted-foreground">Father's Name</p>
          <p className="text-[40%] md:text-base text-center  font-semibold">{result.Details.FATHER_NAME}</p>
        </div>
      </div>

      <ScrollArea className="p-2 rounded-md border">
        <Table className="text-[30%] sm:text-[45%] md:text-[60%] lg:text-[100%] ">
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Subject Code</TableHead>
              <TableHead className="text-left">Subject Name</TableHead>
              <TableHead className="text-center">Internal</TableHead>
              <TableHead className="text-center">External</TableHead>
              <TableHead className="text-center">Total</TableHead>
              <TableHead className="text-center">Grade</TableHead>
              <TableHead className="text-center">Credits</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(result.Result).map(([subCode, subject]) => (
              <TableRow key={subCode}>
                <TableCell>{subCode}</TableCell>
                <TableCell>{subject.name}</TableCell>
                <TableCell className="text-center">{subject.internal}</TableCell>
                <TableCell className="text-center">{subject.external}</TableCell>
                <TableCell className="text-center">{subject.total}</TableCell>
                <TableCell className="text-center">
                  <Badge className={`${getGradeColor(subject.grade)} text-primary-foreground w-8 text-center`}>
                    {subject.grade}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">{subject.credits}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>

      <div className="mt-2 flex justify-between items-center">
        <p className="text-[40%] md:text-md lg:text-lg font-semibold">SGPA</p>
        <Badge variant="outline" className="text-[40%] md:text-md lg:text-lg px-4 py-2">
          {calculateSGPA(result.Result, result.Details.Roll_No)}
        </Badge>
      </div>
    </CardContent>
  </Card>
  </div>
  );
};

export default SemesterTableComponent;