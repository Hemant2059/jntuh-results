const gradePointMappingForR22: { [key: string]: number } = {
    O: 10,
    A: 9,
    B: 8,
    C: 7,
    D: 6,
    F: 0,
    Ab: 0,
  };
  
  const gradePointMapping: { [key: string]: number } = {
    O: 10,
    "A+": 9,
    A: 8,
    "B+": 7,
    B: 6,
    C: 5,
    F: 0,
    Ab: 0,
  };
  
  function calculateSGPA(semesterData: any, hallTicket: string): string {
    let totalCredits = 0.0;
    let totalWeightedGradePoints = 0;
  
    const firstTwoDigits = parseInt(hallTicket.slice(0, 2));
    const gradeMapping =
      firstTwoDigits >= 22 ? gradePointMappingForR22 : gradePointMapping;
  
    for (const subjectCode in semesterData) {
      if (["total", "credits", "CGPA"].includes(subjectCode)) continue;
  
      const subject = semesterData[subjectCode];
  
      if (!subject || !subject.grade || !subject.credits) {
        console.warn(`Invalid data for subject ${subjectCode}`);
        continue;
      }
  
      const grade = subject.grade;
      const credit = parseFloat(subject.credits);
  
      if (grade === "F" || grade === "Ab") {
        return "0.0"; // Adjust this behavior as needed.
      }
  
      totalCredits += credit;
      totalWeightedGradePoints += (gradeMapping[grade] || 0) * credit;
    }
  
    if (totalCredits === 0) {
      console.warn("No valid credits found for SGPA calculation.");
      return "0.00";
    }
  
    const sgpa = totalWeightedGradePoints / totalCredits;
    return sgpa.toFixed(2);
  }
  
  export default calculateSGPA;


 export function calculateCGPA(academicData: any, hallTicket: string): string {
    let totalCredits = 0.0;
    let totalWeightedGradePoints = 0;
  
    const firstTwoDigits = parseInt(hallTicket.slice(0, 2));
    const gradeMapping =
      firstTwoDigits >= 22 ? gradePointMappingForR22 : gradePointMapping;
  for (const semester in academicData){
    const semesterData = academicData[semester];
    for (const subjectCode in semesterData) {
      if (["total", "credits", "CGPA"].includes(subjectCode)) continue;
  
      const subject = semesterData[subjectCode];
  
      if (!subject || !subject.grade || !subject.credits) {
        console.warn(`Invalid data for subject ${subjectCode}`);
        continue;
      }
  
      const grade = subject.grade;
      const credit = parseFloat(subject.credits);
  
      if (grade === "F" || grade === "Ab") {
        return "0.0"; // Adjust this behavior as needed.
      }
  
      totalCredits += credit;
      totalWeightedGradePoints += (gradeMapping[grade] || 0) * credit;
    }}
  
    if (totalCredits === 0) {
      console.warn("No valid credits found for SGPA calculation.");
      return "0.00";
    }
  
    const sgpa = totalWeightedGradePoints / totalCredits;
    return sgpa.toFixed(2);
  }
  
