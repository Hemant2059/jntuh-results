import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import calculateSGPA from "@/lib/sgpa-cal";
import colleges from "@/lib/college";

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

interface ClassTableProps {
  result: Resultresult;
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



const ClassTable: React.FC<ClassTableProps> = ({ result }) => {
  const name = result.Details.NAME || "Unknown";
  return (
    <Card className="w-full max-w-4xl mx-auto mt-4 py-4">
    <CardContent >
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
    
  );
};

export default ClassTable;

