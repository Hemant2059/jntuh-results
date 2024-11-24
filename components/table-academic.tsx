import calculateSGPA from "@/lib/sgpa-cal";
import React from "react";

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

const TableComponent: React.FC<TableComponentProps> = ({ result }) => {
  const data = result;

  if (!data || !data.Details || !data.Result) {
    return <div>No data available</div>;
  }

  const name = data.Details.NAME || "Unknown";

  return (
    <div>
      <div className="flex flex-col items-center justify-center py-2 font-bold text-xl">
        <h1>Academic Results</h1>
        <p className="font-medium text-sm">
          This is not an official website of JNTUH results. Verify your results
          at the official website.
        </p>
        <p>
          This website shows the combine 3-1 and 3-2 results in 3-1 semester.
          This will be fix soon.
        </p>
      </div>

      <div className="m-2 text-[30%] sm:text-[45%] md:text-[60%] lg:text-[100%]">
        <table className="w-[100%] my-2 border-2 border-primary rounded">
          <tbody>
            <tr className="w-max border-b-2 border-primary bg-primary/30">
              <th className="border-primary border-2">NAME</th>
              <th className="border-primary border-2 ">Roll_No</th>
              <th className="border-primary border-2">COLLEGE_CODE</th>
              <th className="border-primary border-2">FATHER_NAME</th>
            </tr>
            <tr className="">
              <th className="border-primary border-2">
                {name == "BISHAL PATHAK" ? "DHAYLE BHAI 😂" : name}
              </th>
              <th className="border-primary border-2 ">
                {data.Details.Roll_No}
              </th>
              <th className="border-primary border-2 ">
                {data.Details.COLLEGE_CODE}
              </th>
              <th className="border-primary border-2 ">
                {data.Details.FATHER_NAME}
              </th>
            </tr>
          </tbody>
        </table>
        {Object.keys(data.Result).map((key) => (
          <div key={key}>
            <table className="border-primary border-2 w-[100%] rounded-t">
              <tbody>
                <tr>
                  <th className="bg-primary/20">{key} Results</th>
                </tr>
              </tbody>
            </table>
            <table className=" w-full border-primary border-2">
              <tbody className="">
                <tr className="w-max bg-primary/20 border-b-2 border-primary">
                  <th className="dark:border-white px-1">SUBJECT_CODE</th>
                  <th className="dark:border-white px-1 text-left">
                    SUBJECT_NAME
                  </th>
                  <th className="dark:border-white px-1">INTERNAL</th>
                  <th className="dark:border-white px-1">EXTERNAL</th>
                  <th className="dark:border-white px-1">TOTAL</th>
                  <th className="dark:border-white px-1">GRADE</th>
                  <th className="dark:border-white px-1">CREDITS</th>
                </tr>
                {Object.keys(data.Result[key]).map((subCode) => (
                  <tr key={subCode}>
                    <th className="dark:border-white">{subCode}</th>
                    <th className="dark:border-white">
                      {data.Result[key][subCode].name}
                    </th>
                    <th className="dark:border-white">
                      {data.Result[key][subCode].internal}
                    </th>
                    <th className="dark:border-white">
                      {data.Result[key][subCode].external}
                    </th>
                    <th className="dark:border-white">
                      {data.Result[key][subCode].total}
                    </th>
                    <th className="dark:border-white ">
                      {data.Result[key][subCode].grade}
                    </th>
                    <th className="dark:border-white">
                      {data.Result[key][subCode].credits}
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
            <table className="dark:border-white rounded-b w-full border-2 border-primary">
              <tbody>
                <tr>
                  <th className="dark:border-white w-[75%]">SGPA</th>
                  <th className="dark:border-white w-[25%]">
                    {calculateSGPA(data.Result[key], data.Details.Roll_No)}
                  </th>
                </tr>
              </tbody>
            </table>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableComponent;
