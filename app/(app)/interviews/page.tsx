import React, { useState, Suspense, useRef } from "react";
import { Header } from "../_components/Header";
import Link from "next/link";
import { Card } from "@/app/_components/Card";
import { PlusIcon } from "@heroicons/react/24/outline";
import { getInterviews } from "../_lib/server/getInterviews";
import { InterviewTable } from "../interview/_components/InterviewBot/InterviewTable";

export default async function Interviews() {
  const interviews = await getInterviews();

  return (
    <div className="h-min">
      <Header
        title="Past interviews"
        rightContent={
          <Link href="/interview" className="btn-neutral btn">
            <PlusIcon height={22} />
            New interview
          </Link>
        }
      />

      <Card className="">
        <InterviewTable interviews={interviews} />
      </Card>
    </div>
  );
}
