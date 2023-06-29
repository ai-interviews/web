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
        <div className="flex flex-wrap mb-6">
            <div className="w-full px-3 mb-6">
                <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="title">
                    Job Title
                </label>
                <input type="text" placeholder="Type here" className="input input-bordered w-full"
                    id="title" value={formJob.title} onChange={(e) => handleChange('title', e.target.value)}/>
            </div>
            <div className="w-full px-3 mb-6">
                <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="company">
                    Company
                </label>
                <input type="text" placeholder="Type here" className="input input-bordered w-full"
                    id="company" value={formJob.company} onChange={(e) => handleChange('company', e.target.value)}/>
            </div>
            <div className="w-full px-3 mb-6">
                <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="location">
                    Location
                </label>
                <input type="text" placeholder="Type here" className="input input-bordered w-full"
                    id="location" value={formJob.location} onChange={(e) => handleChange('location', e.target.value)}/>
            </div>
            <div className="w-full px-3 mb-6">
                <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="description">
                    Job Description
                </label>
                <textarea className="textarea textarea-bordered w-full" style={{height: '200px', resize: 'none'}} placeholder="Bio"
                        id="description" value={formJob.description} onChange={(e) => handleChange('description', e.target.value)}></textarea>
            </div>
        </div>
        <div className="flex items-center">
            <div className="w-full">
                <button className="btn btn-success w-full" type="submit">
                    Confirm
                </button>
            </div>
        </div>
    </form>
  );
}
