import React, { useState, useEffect } from 'react';
import { FormJob } from '../types';

interface JobFormProps {
  initialFormJob: FormJob;
  onSubmit: (formJob: FormJob) => void;
  open: boolean;
}

export default function JobForm({ initialFormJob, onSubmit, open }: JobFormProps) {
  const [formJob, setFormJob] = useState<FormJob>(initialFormJob);
  const [touched, setTouched] = useState<Record<keyof FormJob, boolean>>({
    title: false,
    company: false,
    location: false,
    description: false,
    url: false,
  });

  useEffect(() => {
    setFormJob(initialFormJob);
  }, [initialFormJob]);

  useEffect(() => {
    if (!open) {
      setTouched({
        title: false,
        company: false,
        location: false,
        description: false,
        url: false,
      });
    }
  }, [open]);

  const handleChange = (key: keyof FormJob, value: string) => {
    const newFormJob = { ...formJob, [key]: value };
    setFormJob(newFormJob);
    setTouched({ ...touched, [key]: true });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!formJob.title || !formJob.company || !formJob.location || !formJob.description) {
      const newTouched = {
        title: true,
        company: true,
        location: true,
        description: true,
        url: true
      };
      setTouched(newTouched);
    } else {
      onSubmit(formJob);
    }
  };

  const isInvalid = (key: keyof FormJob) => touched[key] && !formJob[key];

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex flex-wrap mb-6">
            <div className="w-full px-3 mb-6">
                <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="title">
                    Job Title
                </label>
                <input type="text" placeholder="Type here" className={`input input-bordered w-full ${isInvalid('title') ? 'border-red-500' : ''}`}
                    id="title" value={formJob.title} onChange={(e) => handleChange('title', e.target.value)}/>
            </div>
            <div className="w-full px-3 mb-6">
                <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="company">
                    Company
                </label>
                <input type="text" placeholder="Type here" className={`input input-bordered w-full ${isInvalid('title') ? 'border-red-500' : ''}`}
                    id="company" value={formJob.company} onChange={(e) => handleChange('company', e.target.value)}/>
            </div>
            <div className="w-full px-3 mb-6">
                <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="location">
                    Location
                </label>
                <input type="text" placeholder="Type here" className={`input input-bordered w-full ${isInvalid('title') ? 'border-red-500' : ''}`}
                    id="location" value={formJob.location} onChange={(e) => handleChange('location', e.target.value)}/>
            </div>
            <div className="w-full px-3 mb-6">
                <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="description">
                    Job Description
                </label>
                <textarea style={{height: '200px', resize: 'none'}} placeholder="Type here" className={`textarea textarea-bordered w-full ${isInvalid('url') ? 'border-red-500' : ''}`}
                        id="description" value={formJob.description} onChange={(e) => handleChange('description', e.target.value)}></textarea>
            </div>
        </div>
        <div className="w-full px-3 mb-6">
            <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="url">
                Job URL
            </label>
            <input className="textarea textarea-bordered w-full" type="text" placeholder="Type here"
                id="url" value={formJob.url} onChange={(e) => handleChange('url', e.target.value)}/>
        </div>
        <div className="flex items-center">
            <div className="w-full">
                <button className="btn btn-success w-full" type="submit">
                    Save
                </button>
            </div>
        </div>
    </form>
  );
}
