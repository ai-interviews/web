import React, { useEffect, useState } from 'react';
import { Card } from "../../../_components/Card";
import { JobTable } from "./JobTable";

export function LatestJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('/api/getJobs')
      .then(response => response.json()) // Parse response as JSON
      .then(data => {
        setJobs(data); // Store the response data in the jobs state variable
      });
  }, []);

  return (
    <Card className="h-min">
      <div className="text-2xl pl-4 pb-2.5">Added Job</div>
      <JobTable data={jobs} />
    </Card>
  );
}
