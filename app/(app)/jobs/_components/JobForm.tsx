"use client";

import React, { useState } from "react";
import { useToast } from "@/app/_hooks/useToast";
import { callBackend } from "@/app/_lib/server/callBackend";
import { Job } from "@prisma/client";
import { ToastType } from "@/app/_components/Toast";
import { Spinner } from "@/app/_components/Spinner";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import {
  ApiUpsertJobBody,
  ApiUpsertJobResp,
} from "@/app/api/job/_lib/upsertJob";
import { useRouter } from "next/navigation";
import { Input } from "@/app/_components/inputs/Input";
import { Textarea } from "@/app/_components/inputs/Textarea";

type Props = {
  job?: Job | null;
};

type ScrapeJobResp = {
  title?: string;
  company?: string;
  location?: string;
  description?: string;
  url?: string;
};

export default function JobForm({ job }: Props) {
  // Hooks
  const showToast = useToast();
  const router = useRouter();

  // Form state
  const [url, setUrl] = useState<string>(job?.url || "");
  const [title, setTitle] = useState<string>(job?.title || "");
  const [company, setCompany] = useState<string>(job?.company || "");
  const [location, setLocation] = useState<string>(job?.location || "");
  const [description, setDescription] = useState<string>(
    job?.description || ""
  );

  // Form error states
  const [isErrorTitle, setIsErrorTitle] = useState<boolean>(false);
  const [isErrorCompany, setIsErrorCompany] = useState<boolean>(false);
  const [isErrorDescription, setIsErrorDescription] = useState<boolean>(false);

  // Loading states
  const [isLoadingSave, setIsLoadingSave] = useState<boolean>(false);
  const [isLoadingFetchJob, setIsLoadingFetchJob] = useState<boolean>(false);

  const onFetchFromUrl = async () => {
    try {
      if (!url) {
        return;
      }

      setIsLoadingFetchJob(true);

      const response = await fetch(
        `https://webscraperjob.azurewebsites.net/api/linkedinWebScraper?url=${encodeURIComponent(
          url
        )}`
      );
      const res: ScrapeJobResp = await response.json();

      if (!response.ok) {
        throw new Error(JSON.stringify(res));
      }

      // Populate form with results from fetch if found
      if (res.title) setTitle(res.title);
      if (res.company) setCompany(res.company);
      if (res.location) setLocation(res.location);
      if (res.description) setDescription(res.description);

      showToast({
        type: "success",
        text: "Job added successfully!",
      });
    } catch (e) {
      console.error("Error fetching job details.", e);
      showToast({
        type: "danger",
        text: "Error fetching job details. Please try again or enter manually.",
      });
    }

    setIsLoadingFetchJob(false);
  };

  const onSave = async () => {
    try {
      const [type, text] = [
        "danger" as ToastType,
        "Please fill in all required fields.",
      ];

      if (!title) {
        setIsErrorTitle(true);
        showToast({ type, text });
        return;
      }

      if (!company) {
        setIsErrorCompany(true);
        showToast({ type, text });
        return;
      }

      if (!description) {
        setIsErrorDescription(true);
        showToast({ type, text });
        return;
      }

      setIsLoadingSave(true);

      const { job: newJob } = await callBackend<
        ApiUpsertJobResp,
        ApiUpsertJobBody
      >({
        url: "/api/job",
        method: "PUT",
        body: {
          id: job?.id,
          url,
          title,
          company,
          location,
          description,
        },
      });

      showToast({
        type: "success",
        text: "Saved.",
      });

      router.push(`/jobs/${newJob.id}?success=true`);
    } catch (e) {
      console.error(e);
      showToast({
        type: "danger",
        text: "There was an error adding this job. Please try again or contact a developer.",
      });
    }

    setIsLoadingSave(false);
  };

  const onChangeTitle = (v: string) => {
    setIsErrorTitle(false);
    setTitle(v);
  };

  const onChangeCompany = (v: string) => {
    setIsErrorCompany(false);
    setCompany(v);
  };

  const onChangeDescription = (v: string) => {
    setIsErrorDescription(false);
    setDescription(v);
  };

  return (
    <div className="w-full space-y-5 p-1 md:w-2/3">
      <div>
        <label
          className="mb-2 block text-xs font-bold uppercase tracking-wide"
          htmlFor="url"
        >
          Job URL
        </label>
        <div className="flex w-full items-center gap-2">
          <Input placeholder="Type here" value={url} onChange={setUrl} />
          <button
            className="btn-neutral btn"
            onClick={onFetchFromUrl}
            disabled={isLoadingFetchJob}
          >
            {isLoadingFetchJob ? (
              <Spinner size="sm" />
            ) : (
              <>
                <ArrowPathIcon height={22} /> Fetch
              </>
            )}
          </button>
        </div>
      </div>
      <Input
        label="Job title"
        isError={isErrorTitle}
        value={title}
        onChange={onChangeTitle}
      />
      <Input
        label="Company"
        isError={isErrorCompany}
        value={company}
        onChange={onChangeCompany}
      />
      <Input label="Location" value={location} onChange={setLocation} />
      <Textarea
        label="Job description"
        placeholder="Paste here"
        value={description}
        isError={isErrorDescription}
        onChange={onChangeDescription}
      />

      <button
        className="btn-neutral btn w-full md:w-24"
        onClick={onSave}
        disabled={isLoadingSave}
      >
        {isLoadingSave ? <Spinner size="sm" /> : "Save"}
      </button>
    </div>
  );
}
