import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SubjectDropdownProps {
  subjects: { code: string; name: string }[];
  onSubjectChange: (subject: string) => void;
}

export function SubjectDropdown({ subjects, onSubjectChange }: SubjectDropdownProps) {
  return (
    <Select onValueChange={onSubjectChange}>
      <SelectTrigger className="w-[280px] md:w-auto">
        <SelectValue placeholder="Select a subject" />
      </SelectTrigger>
      <SelectContent  className="text-sm">
        {subjects.map((subject) => (
          <SelectItem key={subject.code} value={subject.code}>
            {subject.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

