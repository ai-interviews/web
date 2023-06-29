import React, { useState, useEffect } from 'react';
import { FormJob } from '../types';

interface JobFormProps {
  initialFormJob: FormJob;
  onSubmit: (formJob: FormJob) => void;
}

export default function JobForm({ initialFormJob, onSubmit }: JobFormProps) {
  const [formJob, setFormJob] = useState<FormJob>(initialFormJob);

  useEffect(() => {
    setFormJob(initialFormJob);
  }, [initialFormJob]);

  const handleChange = (key: keyof FormJob, value: string) => {
    const newFormJob = { ...formJob, [key]: value };
    setFormJob(newFormJob);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formJob);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="title">
                    Job Title
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                    id="title" type="text" value={formJob.title} onChange={(e) => handleChange('title', e.target.value)}/>
            </div>
            <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="company">
                    Company
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" 
                    id="company" type="text" value={formJob.company} onChange={(e) => handleChange('company', e.target.value)}/>
            </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="location">
                    Location
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                    id="location" type="text" value={formJob.location} onChange={(e) => handleChange('location', e.target.value)}/>
            </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="description">
                    Job Description
                </label>
                <textarea className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white h-48" 
                        id="description" value={formJob.description} onChange={(e) => handleChange('description', e.target.value)}></textarea>
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
  );
}
