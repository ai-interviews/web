"use client";
import React, { useState, Suspense, useRef } from "react";
import { Header } from "../_components/Header";
import Modal from "./_components/modal";
import { useClientUser } from "@/app/_hooks/useClientUser";
import JobForm from "./_components/JobForm";
import LatestJobs from "./_components/LatestJobs";
import Link from "next/link";

export default function Jobs() {
  const { user } = useClientUser();
  const [jobLink, setJobLink] = useState("");
  const [jobs, setJobs] = useState<
    Array<{
      title: string;
      company: string;
      location: string;
      description: string;
    }>
  >([]);
  const [formJob, setFormJob] = useState<{
    title?: string;
    company?: string;
    location?: string;
    description?: string;
    url?: string;
  } | null>(null);

  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen((prev) => !prev);

  const latestJobsRef = useRef<{ fetchJobs: () => void }>({
    fetchJobs: () => {},
  });

  const handleAddJob = async () => {
    if (jobLink) {
      const response = await fetch(
        `https://webscraperjob.azurewebsites.net/api/linkedinWebScraper?url=${encodeURIComponent(
          jobLink
        )}`
      );
      const jobDetails = await response.json();

      if (response.ok) {
        setFormJob(jobDetails);
      } else {
        console.error("Failed to fetch job details:", jobDetails);
      }
    } else {
      setFormJob({
        title: "",
        company: "",
        location: "",
        description: "",
        url: "",
      });
    }
    handleToggle();
  };

  return (
    <div className="h-min">
      <div className="mb-4 2xl:mb-8">
        <Header title={`My Jobs`} />
      </div>

      <div className="container mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between py-6">
          <input
            type="text"
            className="mr-6 flex-grow rounded border p-2 shadow-sm"
            value={jobLink}
            onChange={(e) => setJobLink(e.target.value)}
            placeholder="Paste job link here..."
          />

          {/* <button className="btn-outline btn" onClick={handleAddJob}>
            +
          </button> */}
          <Link href="/jobs/new" className="btn-outline btn">
            +
          </Link>
        </div>

        <div className="card h-min bg-base-200 px-5 py-6">
          <Suspense fallback={<div>Loading...</div>}>
            <LatestJobs ref={latestJobsRef} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
