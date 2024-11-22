import TableClassComponent from "@/components/table-class";
import React from "react";

const page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ hallticket: string }>;
  searchParams: Promise<{ sem?: string; r?: string; l?: string }>;
}) => {
  const fullhallticket = (await params).hallticket;
  const year = parseInt(fullhallticket.slice(0, 2));
  const RorL = fullhallticket.slice(4, 5);
  let hallticket;
  if (RorL === "1") {
    hallticket = fullhallticket.slice(0, 8);
  } else {
    const startingYear = year - 1;
    const Mhallticket = fullhallticket.slice(2, 4);
    const Lhallticket = fullhallticket.slice(5, 8);
    hallticket = `${startingYear}${Mhallticket}1${Lhallticket}`;
  }

  const sem = (await searchParams).sem;
  const r = (await searchParams).r;
  const l = (await searchParams).l;

  const response = await fetch(
    `https://jntuhapi.up.railway.app/results/class?htno=${hallticket}&sem=${sem}&r=${r}&l=${l}`
  );
  const result = await response.json();

  return (
    <div>
      <TableClassComponent result={result} />
    </div>
  );
};

export default page;
