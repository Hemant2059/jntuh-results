import TableComponent from "@/components/table-academic";
import React from "react";

const page = async ({
  params,
}: {
  params: Promise<{ hallticket: string }>;
}) => {
  const hallticket = (await params).hallticket;
  const response = await fetch(
    `https://jntuhapi.up.railway.app/results/academic?ht=${hallticket}`
  );
  const result = await response.json();

  return (
    <div>
      <TableComponent result={result} />
    </div>
  );
};

export default page;
