import React from "react";
import calculateSGPA from "@/lib/sgpa-cal";

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

interface ResultData {
  Details: ResultDetails;
  Result: { [subjectCode: string]: SubjectResult };
}

interface TableClassProps {
  result: ResultData[];
}

const TableClassComponent: React.FC<TableClassProps> = ({ result }) => {
  if (!result || result.length === 0) return <div>No data</div>;

  return (
    <div>
      <div className="flex items-center justify-center py-2  font-bold text-xl">
        <h1>Class Results</h1>
      </div>
      {result.map((data, index) => (
        <div key={index} className="m-2 mb-4 text-sm lg:text-base">
          <table className="w-full border-2 border-primary rounded-t">
            <thead>
              <tr className="bg-primary/30">
                <th className="border-primary border-2">NAME</th>
                <th className="border-primary border-2">Roll_No</th>
                <th className="border-primary border-2">COLLEGE_CODE</th>
                <th className="border-primary border-2">FATHER_NAME</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td className="border-primary border-2">{data.Details.NAME}</td>
                <td className="border-primary border-2">
                  {data.Details.Roll_No}
                </td>
                <td className="border-primary border-2">
                  {data.Details.COLLEGE_CODE}
                </td>
                <td className="border-primary border-2">
                  {data.Details.FATHER_NAME}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Subjects Table */}
          <table className="w-full border-2 border-primary border-t-0">
            <thead>
              <tr className="bg-primary/20">
                <th>SUBJECT_CODE</th>
                <th>SUBJECT_NAME</th>
                <th>INTERNAL</th>
                <th>EXTERNAL</th>
                <th>TOTAL</th>
                <th>GRADE</th>
                <th>CREDITS</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data.Result).length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center">
                    No subjects found
                  </td>
                </tr>
              ) : (
                Object.keys(data.Result).map((subCode) => (
                  <tr
                    key={subCode}
                    className="border-b-2 border-slate-400 text-center"
                  >
                    <td>{subCode}</td>
                    <td className="text-left">{data.Result[subCode].name}</td>
                    <td>{data.Result[subCode].internal}</td>
                    <td>{data.Result[subCode].external}</td>
                    <td>{data.Result[subCode].total}</td>
                    <td>{data.Result[subCode].grade}</td>
                    <td>{data.Result[subCode].credits}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* SGPA Table */}
          <table className="w-full border-2 border-primary rounded-b border-t-0">
            <tbody>
              <tr>
                <th className="w-3/4">SGPA</th>
                <td className="w-1/4">
                  {(() => {
                    try {
                      return calculateSGPA(data.Result, data.Details.Roll_No);
                    } catch (error) {
                      console.error("Error calculating SGPA:", error);
                      return "N/A";
                    }
                  })()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default TableClassComponent;
