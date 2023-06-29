import React, { useState } from 'react';
import { Job, FormJob } from "../types";
import { truncateText } from "../../_lib/client/truncateText";
import { Table } from "../../_components/Table/Table";
import { TableCol } from "../../_components/Table/TableCol";
import Modal from './modal';
import JobForm from './JobForm';

type Props = {
  data: Job[];
};

export function JobTable({ data }: Props) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    const rows: TableCol[][] = data.map((row) => [
        // Title
        {
          type: "Text",
          data: {
            text: row.title || '',
          },
        },
        // Company
        {
          type: "Text",
          data: {
            text: row.company || '',
          },
        },
        // Location
        {
          type: "Text",
          data: {
            text: row.location || '',
          },
        },
        // Description
        {
            type: "Text",
            data: {
              text: truncateText({ text: row.description || '', length: 100 }),
            },
          },
      ]);
     
  return (
    <div>
      <Table
        headers={[
          { label: "Title", hiddenThreshold: "lg" },
          { label: "Company" },
          { label: "Location" },
          { label: "Description", hiddenThreshold: "sm" },
        ]}
        data={rows}
        onRowClick={(index, rowData) => {
          setSelectedJob(data[index]);
          setModalOpen(true);
        }}
      />
      {selectedJob && (
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <JobForm
            initialFormJob={selectedJob as FormJob}
            onSubmit={newJob => {
              console.log('Job updated', newJob);
              setModalOpen(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
}
