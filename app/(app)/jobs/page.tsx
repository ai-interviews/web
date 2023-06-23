"use client";
import React, { useState, Suspense } from 'react';
import { Header } from "../_components/Header";

export default function Jobs() {
  const [jobLink, setJobLink] = useState('');
  const [jobs, setJobs] = useState<string[]>([]);
  
  const handleAddJob = async () => {
      if (jobLink) {
          const response = await fetch('https://webscraperjob.azurewebsites.net/api/linkedinWebScraper?url=' + jobLink, {method: 'GET'});
          const jobDetails = await response.text();
          if (response.ok) {
              setJobs([...jobs, jobDetails]);
          } else {
              console.error('Failed to fetch job details:', jobDetails);
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
                <div className="card bg-base-200 py-6 px-5 h-min">
                  <Suspense fallback={<div>Loading...</div>}>
                      <h2 className="text-2xl pl-4 pb-2.5">Jobs Added</h2>
                      {/* This is where the job listings will go */}
                      <ul>
                          {jobs.map((job, index) => (
                              <li key={index}>{job}</li>
                          ))}
                      </ul>
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
