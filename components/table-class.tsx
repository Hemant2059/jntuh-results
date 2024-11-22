import React from "react";
import calculateSGPA from "@/lib/sgpa-cal";

const TableClassComponent = (result: any) => {
  const datas = result.result;
  if (!datas) return <div>No data</div>;

  return (
    <div>
      <div className="flex items-center justify-center py-2 font-bold text-xl">
        <h1>Class Results</h1>
      </div>
      {datas.map((data: any, index: number) => (
        <div
          key={index}
          className="m-2 text-[30%] sm:text-[45%] md:text-[60%] lg:text-[100%] "
        >
          <table className="w-[100%] my-2 border-2 border-primary rounded">
            <tbody>
              <tr className="w-max border-b-2 border-primary bg-primary/30">
                <th className="border-primary border-2">NAME</th>
                <th className="border-primary border-2 ">Roll_No</th>
                <th className="border-primary border-2">COLLEGE_CODE</th>
                <th className="border-primary border-2">FATHER_NAME</th>
              </tr>
              <tr className="">
                <th className="border-primary border-2">{data.Details.NAME}</th>
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

          <div>
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

                {Object.keys(data.Result).map((subCode) => (
                  <tr key={subCode} className="border-b-2 border-slate-400">
                    <th className="dark:border-white">{subCode}</th>
                    <th className="dark:border-white text-left">
                      {data.Result[subCode].name}
                    </th>
                    <th className="dark:border-white">
                      {data.Result[subCode].internal}
                    </th>
                    <th className="dark:border-white">
                      {data.Result[subCode].external}
                    </th>
                    <th className="dark:border-white">
                      {data.Result[subCode].total}
                    </th>
                    <th className="dark:border-white ">
                      {data.Result[subCode].grade}
                    </th>
                    <th className="dark:border-white">
                      {data.Result[subCode].credits}
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
                    {calculateSGPA(data.Result, data.Details.Roll_No)}
                  </th>
                </tr>
              </tbody>
            </table>
            <br />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableClassComponent;
