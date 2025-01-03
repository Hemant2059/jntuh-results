import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Student } from "@/lib/formatData"

import { usePDF } from "react-to-pdf";
import { Download } from 'lucide-react';

type ComparisonTableProps = {

  subjects: { code: string; name: string }[];
  selectedSubject: string;

  students: Student[];

};


export function ComparisonTable({ students, selectedSubject,subjects}: ComparisonTableProps) {
  selectedSubject = selectedSubject || subjects[0].code;
  
  const { toPDF, targetRef } = usePDF({filename: `subject_comp_result.pdf`});
  return (
    <Card className="w-full mt-4 py-4">
      <div className="flex justify-end mb-4 mr-2">
        <Button onClick={() => toPDF()} variant="secondary">
          <Download className="mr-2  h-4 w-4" /> Download Result
        </Button>
      </div>
      <CardContent >
    <Table className="text-[30%] sm:text-[45%] md:text-[60%] lg:text-[100%]  " ref={targetRef}>
      <TableHeader>
        <TableRow>
          <TableHead>Roll No</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Internal</TableHead>
          <TableHead>External</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Grade</TableHead>
          <TableHead>Credits</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.Details.Roll_No}>
            <TableCell>{student.Details.Roll_No}</TableCell>
            <TableCell>{student.Details.NAME}</TableCell>
            <TableCell>{student.Result[selectedSubject].internal}</TableCell>
            <TableCell>{student.Result[selectedSubject].external}</TableCell>
            <TableCell>{student.Result[selectedSubject].total}</TableCell>
            <TableCell>{student.Result[selectedSubject].grade}</TableCell>
            <TableCell>{student.Result[selectedSubject].credits}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </CardContent>
  </Card>
  )
}

