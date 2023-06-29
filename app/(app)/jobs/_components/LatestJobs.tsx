import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Card } from "../../../_components/Card";
import { JobTable } from "./JobTable";

const LatestJobs = forwardRef((props, ref) => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = () => {
    fetch('/api/getJobs')
      .then(response => response.json())
      .then(data => {
        setJobs(data);
      });
  };

  useImperativeHandle(ref, () => ({
    fetchJobs
  }));

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <Card className="h-min">
      <div className="text-2xl pl-4 pb-2.5">Added Job</div>
      <JobTable data={jobs} />
    </Card>
  );
});

export default LatestJobs;
