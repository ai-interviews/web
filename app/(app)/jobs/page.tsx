"use client";
import React, { useState, Suspense } from 'react';
import { Header } from "../_components/Header";
import Modal from "./_components/modal";
import { useClientUser } from "@/app/_lib/client/hooks/useClientUser";
import JobForm from "./_components/JobForm";
import { LatestJobs } from "./_components/LatestJobs";

export default function Jobs() {
  const { user } = useClientUser();
  const [jobLink, setJobLink] = useState('');
  const [jobs, setJobs] = useState<Array<{title: string, company: string, location: string, description: string}>>([]);
  const [formJob, setFormJob] = useState<{title?: string, company?: string, location?: string, description?: string, url?: string} | null>(null);
  
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen((prev) => !prev);

  const handleAddJob = async () => {
      if (jobLink) {
          const response = await fetch('https://webscraperjob.azurewebsites.net/api/linkedinWebScraper?url=' + jobLink, {method: 'GET'});
          const jobDetails = await response.json();

          if (response.ok) {
              setFormJob(jobDetails);
              handleToggle();
          } else {
              console.error('Failed to fetch job details:', jobDetails);
          }
      }
  };

  const handleFormSubmit = async (formJob: {title?: string, company?: string, location?: string, description?: string, url?: string} | null) => {
    if (formJob && user) {
      const jobData = {
        userId: user.id,
        title: formJob.title,
        company: formJob.company,
        location: formJob.location,
        description: formJob.description,
        url: jobLink,
      };

      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        const job = await response.json();
        setJobs(prevJobs => [...prevJobs, job]);
        setFormJob(null);
        setJobLink('');
        handleToggle();
      } else {
        console.error('Failed to submit job:', await response.text());
      }
    }
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
                  className="flex-grow mr-6 p-2 rounded border shadow-sm"
                  value={jobLink}
                  onChange={(e) => setJobLink(e.target.value)}
                  placeholder="Paste job link here..."
              />

              <button 
                  className="btn btn-outline"
                  onClick={handleAddJob}
              >
                  +
              </button>
          </div>

          <Modal open={open} disableClickOutside ={true} onClose={handleToggle}>
          {formJob && (
            <JobForm initialFormJob={formJob} onSubmit={handleFormSubmit} />
          )}
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleToggle}>
                  close
              </button>
            </div>
          </Modal>

          <div className="card bg-base-200 py-6 px-5 h-min">
            <Suspense fallback={<div>Loading...</div>}>
              <LatestJobs />
            </Suspense>
          </div>
      </div>
  </div>
  );
}