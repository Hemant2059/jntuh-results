import calculateSGPA from "@/lib/sgpa-cal";
import React from "react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import colleges from "@/lib/college";
import branches from "@/lib/branch";
import { Download } from "lucide-react";

interface Subject {
  name: string;
  internal: number;
  external: number;
  total: number;
  grade: string;
  credits: number;
}

interface SemesterResults {
  [subjectCode: string]: Subject;
}

interface StudentDetails {
  NAME: string;
  Roll_No: string;
  COLLEGE_CODE: string;
  FATHER_NAME: string;
}

interface ResultData {
  Details: StudentDetails;
  Result: { [semester: string]: SemesterResults };
}

interface TableComponentProps {
  result: ResultData;
}

const getGradeColor = (grade: string): string => {
  const gradeColors: { [key: string]: string } = {
    'O': 'bg-green-700',
    'A+': 'bg-green-600',
    'A': 'bg-green-500',
    'B+': 'bg-blue-500',
    'B': 'bg-blue-400',
    'C+': 'bg-yellow-400',
    'C': 'bg-yellow-300',
    'D': 'bg-orange-400',
    'F': 'bg-red-600'
  };
  return gradeColors[grade] || 'bg-gray-400';
};

const AcademicTable: React.FC<TableComponentProps> = ({ result }) => {
  const data = result;
  
  if (!data || !data.Details || !data.Result) {
    return <div>No data available</div>;
  }
  
  const name = data.Details.NAME || "Unknown";
  const rollno = data.Details.Roll_No || "Unknown";
  const collegeCode = result.Details.COLLEGE_CODE as keyof typeof colleges;
  const collegeName = colleges[collegeCode] || "Unknown";
  const courseCode = result.Details.Roll_No.slice(6, 8) as keyof typeof branches;
  const branch = branches[courseCode] || "Unknown";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col items-center justify-center py-2 font-bold text-xl print:hidden">
        <h1>Academic Results</h1>
      </div>

      <div className="flex justify-end mb-4 mr-2 print:hidden">
        <Button onClick={() => window.print()} variant="secondary">
          <Download className="mr-2  h-4 w-4" /> Download Result
        </Button>
      </div>

      <div>
        <Card className="w-full max-w-4xl mx-auto mt-4 py-4">
          <CardTitle className="text-base md:text-xl lg:text-2xl font-bold text-center mb-6 pb-4 border-b-2">
            <div>{collegeName}</div>
            <div className="text-base text-gray-600">{branch}</div>
          </CardTitle>
          <CardContent>
            <div className="grid grid-cols-5 gap-2 mb-3 px-2 pb-0">
              <div className="col-span-2">
                <p className="text-[40%] md:text-base text-center font-medium text-muted-foreground">Name</p>
                <p className="text-[40%] md:text-base text-center font-semibold">{name === "BISHAL PATHAK" ? "DHAYLE BHAI 😂" : name}</p>
              </div>
              <div>
                <p className="text-[40%] md:text-base text-center font-medium text-muted-foreground">Hall Ticket</p>
                <p className="text-[40%] md:text-base text-center font-semibold">{result.Details.Roll_No}</p>
              </div>        
              <div className="col-span-2">
                <p className="text-[40%] md:text-base text-center font-medium text-muted-foreground">Father Name</p>
                <p className="text-[40%] md:text-base text-center font-semibold">{result.Details.FATHER_NAME}</p>
              </div>
            </div>
            {Object.keys(data.Result).map((key) => (
              <div key={key}>
                <ScrollArea className="p-2 rounded-md border mt-3">
                  <Table className="text-[30%] sm:text-[45%] md:text-[60%] lg:text-[100%]">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-center font-bold text-black" colSpan={7}>
                          {key} Results
                        </TableHead>
                      </TableRow>
                    </TableHeader>
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
                      {Object.keys(data.Result[key]).map((subCode) => (
                        <TableRow key={subCode}>
                          <TableCell>{subCode}</TableCell>
                          <TableCell>{data.Result[key][subCode].name}</TableCell>
                          <TableCell className="text-center">{data.Result[key][subCode].internal}</TableCell>
                          <TableCell className="text-center">{data.Result[key][subCode].external}</TableCell>
                          <TableCell className="text-center">{data.Result[key][subCode].total}</TableCell>
                          <TableCell className="text-center">
                            <Badge className={`${getGradeColor(data.Result[key][subCode].grade)} text-primary-foreground w-8 text-center`}>
                              {data.Result[key][subCode].grade}
                            </Badge>
                            
                          </TableCell>
                          <TableCell className="text-center">{data.Result[key][subCode].credits}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
                <div className="mt-2 flex justify-between items-center px-4">
                  <p className="text-[40%] md:text-md lg:text-lg font-semibold">SGPA</p>
                  <Badge variant="outline" className="text-[40%] md:text-md lg:text-lg px-4 py-2">
                    {calculateSGPA(data.Result[key], data.Details.Roll_No)}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AcademicTable;

