export interface Student {
  Details: {
    NAME: string;
    Roll_No: string;
    FATHER_NAME: string;
    COLLEGE_CODE: string;
  };
  Result: {
    [key: string]: {
      name: string;
      grade: string;
      credits: string;
      internal: string;
      external: string;
      total: string;
      rcrv: boolean;
    };
  };
}

export interface FormattedData {
  subjects: { code: string; name: string }[];
  formattedData: Student[];
}

export function formatStudentData(data: Student[]): FormattedData {
  const subjects = Object.entries(data[0].Result).map(([code, subject]) => ({
    code,
    name: subject.name
  }));
  return {
    subjects,
    formattedData: data,
  };
}

