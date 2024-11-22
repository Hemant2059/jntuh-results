"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const errorPage = () => {
  return (
    <div className="flex flex-col gap-3 items-center justify-center h-screen">
      <div>
        <h1>404</h1>
        <p>Data Not Found</p>
      </div>
      <div className="flex gap-2">
        <Button>
          <Link href="/classresult">Go Back</Link>
        </Button>
        {/* //refresh */}
        <Button onClick={() => window.location.reload()}>Refresh</Button>
      </div>
    </div>
  );
};

export default errorPage;
