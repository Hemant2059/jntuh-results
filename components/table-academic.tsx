import calculateSGPA from "@/lib/sgpa-cal";
import React from "react";

const TableComponent = (result: any) => {
  const data = result.result;
  const name = data.Details.NAME;

  if (!data) return <div>No data</div>;
  return (
    <div>
      <div className="flex flex-col items-center justify-center py-2 font-bold text-xl">
        <h1>Academic Results</h1>
        <p className="font-medium text-sm">
          This is not a official website of JNTUH result. So, verify your
          results at jntuh result website.
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
        {Object.keys(data.Result).map((sem) => (
          <div key={sem}>
            <table className="border-primary border-2 w-[100%] rounded-t">
              <tbody>
                <tr>
                  <th className="bg-primary/20">{sem} Results</th>
                </tr>
              </tbody>
            </table>
            <table className=" w-full border-primary border-2">
              <tbody className="">
                <tr className="w-max bg-primary/20 border-b-2 border-primary">
                  <th className="dark:border-white px-1">SUBJECT_CODE</th>
                  <th className="dark:border-white px-1">SUBJECT_NAME</th>
                  <th className="dark:border-white px-1">INTERNAL</th>
                  <th className="dark:border-white px-1">EXTERNAL</th>
                  <th className="dark:border-white px-1">TOTAL</th>
                  <th className="dark:border-white px-1">GRADE</th>
                  <th className="dark:border-white px-1">CREDITS</th>
                </tr>

                {Object.keys(data.Result[sem]).map((subCode) => (
                  <tr key={subCode} className="border-b-2 border-slate-400">
                    <th className="dark:border-white">{subCode}</th>
                    <th className="dark:border-white text-left">
                      {data.Result[sem][subCode].name}
                    </th>
                    <th className="dark:border-white">
                      {data.Result[sem][subCode].internal}
                    </th>
                    <th className="dark:border-white">
                      {data.Result[sem][subCode].external}
                    </th>
                    <th className="dark:border-white">
                      {data.Result[sem][subCode].total}
                    </th>
                    <th className="dark:border-white ">
                      {data.Result[sem][subCode].grade}
                    </th>
                    <th className="dark:border-white">
                      {data.Result[sem][subCode].credits}
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
                    {calculateSGPA(data.Result[sem], data.Details.Roll_No)}
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
