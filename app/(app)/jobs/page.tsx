import React, { useState, Suspense, useRef } from "react";
import { Header } from "../_components/Header";
import Link from "next/link";
import { Card } from "@/app/_components/Card";
import { JobTable } from "./_components/JobTable";
import prisma from "@/app/_lib/server/prismadb";
import { getJobs } from "../_lib/server/getJobs";
import { PlusIcon } from "@heroicons/react/24/outline";

export default async function Jobs() {
  const jobs = await getJobs();

  return (
    <div className="h-min">
      <Header
        title="My Jobs"
        rightContent={
          <Link href="/jobs/new" className="btn-neutral btn">
            <PlusIcon height={22} />
            Add job
          </Link>
        }
      />

      <Card className="">
        <JobTable data={jobs} />
      </Card>
    </div>
  );
}
