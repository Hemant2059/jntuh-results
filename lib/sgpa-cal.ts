function calculateSGPA(semesterData: any, hallTicket: string) {
  const gradePointMappingForR22 = {
    O: 10,
    A: 9,
    B: 8,
    C: 7,
    D: 6,
    F: 0,
    Ab: 0,
  } as { [key: string]: number };
  const gradePointMapping = {
    O: 10,
    "A+": 9,
    A: 8,
    "B+": 7,
    B: 6,
    C: 5,
    F: 0,
    Ab: 0,
  } as { [key: string]: number };

  let totalCredits = 0.0;
  let totalWeightedGradePoints = 0;
  const firsttwodigit = parseInt(hallTicket.slice(0, 2));

  for (const subjectCode in semesterData) {
    if (["total", "credits", "CGPA"].includes(subjectCode)) continue;
    const subject = semesterData[subjectCode];
    const grade = subject.grade;
    if (grade === "F" || grade === "Ab") {
      return "AALU";
    }
    const credit = parseFloat(subject.credits);

    totalCredits += credit;
    if (firsttwodigit >= 22)
      totalWeightedGradePoints += gradePointMappingForR22[grade] * credit;
    else {
      totalWeightedGradePoints += gradePointMapping[grade] * credit;
    }
  }

  // Calculate SGPA for the semester
  const sgpa = totalWeightedGradePoints / totalCredits;

  // Round SGPA to two decimal places
  return sgpa.toFixed(2);
}

export default calculateSGPA;
