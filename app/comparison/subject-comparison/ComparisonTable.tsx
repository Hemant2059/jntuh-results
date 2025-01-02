import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Student } from "@/lib/formatData"

type ComparisonTableProps = {

  subjects: { code: string; name: string }[];
  selectedSubject: string;

  students: Student[];

};


export function ComparisonTable({ students, selectedSubject,subjects}: ComparisonTableProps) {
  selectedSubject = selectedSubject || subjects[0].code;
  return (
    <Card className="w-full mt-4 py-4">
      <CardContent >
    <Table className="text-[30%] sm:text-[45%] md:text-[60%] lg:text-[100%] ">
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

