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

      let hasError = false;

      if (!title) {
        setIsErrorTitle(true);
        hasError = true;
      }

      if (!company) {
        setIsErrorCompany(true);
        hasError = true;
      }

      if (!description) {
        setIsErrorDescription(true);
        hasError = true;
      }

      if (hasError) {
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

      router.refresh();
      router.push(`/jobs/${newJob.id}`);
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

  const onChangeUrl = (v: string) => {
    try {
      const _url = new URL(v);
      setUrl(_url.origin + _url.pathname);
    } catch (e) {
      setUrl(v);
    }
  };

  return (
    <div className="w-full space-y-5 p-1 md:w-2/3">
      <div>
        <label
          className="mb-2 block text-xs font-bold uppercase tracking-wide"
          htmlFor="url"
        >
          Linkedin Job URL
        </label>
        <div className="flex w-full items-start gap-2">
          <Input
            placeholder="Type here"
            value={url}
            onChange={onChangeUrl}
            bottomLabel={
              <>
                <ul>
                  <li>Please note that the LinkedIn link you are about to share can be retrieved in 2 specific way. On the LinkedIn job post:</li>
                  <li>
                    1. Click on the 
                    <span style={{display: 'inline-flex', alignItems: 'center', margin: '0 5px'}}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" width="12" height="12" focusable="false">
                        <path d="M23 12l-4.61 7H16l4-6H8a3.92 3.92 0 00-4 3.84V17a4 4 0 00.19 1.24L5.12 21H3l-.73-2.22A6.4 6.4 0 012 16.94 6 6 0 018 11h12l-4-6h2.39z"></path>
                      </svg>
                    </span>
                    button. A menu will pop up, and from this menu, click &apos;Copy link&apos;. This will copy the link to the job post onto your clipboard.
                  </li>
                  <li>2. Click on the job description to be redirected to the full LinkedIn job description and copy the URL from your web browser&apos;s address bar.</li>
                </ul>
              </>
            }
          />
          <button
            style={{ marginTop: '6px' }}
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
