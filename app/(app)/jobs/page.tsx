"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { Header } from "../_components/Header";
import Modal from "./_components/modal";
import { useClientUser } from "@/app/_lib/client/hooks/useClientUser";

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

const handleSubmitJob = async (event: React.FormEvent) => {
  event.preventDefault();

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
                    //onClick={handleAddJob}
                    onClick={handleAddJob}
                >
                    +
                </button>
            </div>

            <Modal open={open} disableClickOutside ={true} onClose={handleToggle}>
            {formJob && (
              <div>
                  <div className="mt-6">
                      <form onSubmit={handleSubmitJob} className="w-full max-w-lg">
                          <div className="flex flex-wrap -mx-3 mb-6">
                              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="title">
                                      Job Title
                                  </label>
                                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                                      id="title" type="text" value={formJob.title} onChange={(e) => setFormJob(prevJob => ({...prevJob, title: e.target.value}))}/>
                              </div>
                              <div className="w-full md:w-1/2 px-3">
                                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="company">
                                      Company
                                  </label>
                                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" 
                                      id="company" type="text" value={formJob.company} onChange={(e) => setFormJob(prevJob => ({...prevJob, company: e.target.value}))}/>
                              </div>
                          </div>
                          <div className="flex flex-wrap -mx-3 mb-6">
                              <div className="w-full px-3">
                                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="location">
                                      Location
                                  </label>
                                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                                      id="location" type="text" value={formJob.location} onChange={(e) => setFormJob(prevJob => ({...prevJob, location: e.target.value}))}/>
                              </div>
                          </div>
                          <div className="flex flex-wrap -mx-3 mb-6">
                              <div className="w-full px-3">
                                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
                                      Job Description
                                  </label>
                                  <textarea className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white h-48" 
                                          id="description" value={formJob.description} onChange={(e) => setFormJob(prevJob => ({...prevJob, description: e.target.value}))}></textarea>
                              </div>
                          </div>
                          <div className="md:flex md:items-center">
                              <div className="md:w-1/3">
                                  <button className="shadow bg-teal-500 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                      Confirm
                                  </button>
                              </div>
                              <div className="md:w-2/3"></div>
                          </div>
                      </form>
                  </div>
              </div>
            )}
              <div className="modal-action">
                {/* closes the modal */}
                <button className="btn btn-primary" onClick={handleToggle}>
                    close
                </button>
                </div>
            </Modal>
            <div className="card bg-base-200 py-6 px-5 h-min">
              <Suspense fallback={<div>Loading...</div>}>
                  <h2 className="text-2xl pl-4 pb-2.5">Jobs Added</h2>
                  {/* Display jobs in a table */}
                  <table>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Company</th>
                        <th>Location</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobs.map((job, index) => (
                        <tr key={index}>
                          <td>{job.title}</td>
                          <td>{job.company}</td>
                          <td>{job.location}</td>
                          <td>{job.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Suspense>
            </div>
        </div>
    </div>
  );
}
