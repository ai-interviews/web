"use client";

import { truncateText } from "@/app/(app)/_lib/client/truncateText";
import { Dropdown } from "@/app/_components/inputs/Dropdown";
import { Job } from "@prisma/client";

type Props = {
  data: Job[];
  value?: Job;
  onChange?: (job: Job) => void;
  disabled?: boolean;
};

export function JobListingDropdown({ data, value, onChange, disabled }: Props) {
  return (
    <Dropdown
      onChange={(id) => onChange?.(data.find((job) => job.id === id)!)}
      options={data.map(({ id, title }) => ({
        label: truncateText({ text: title, length: 45 }),
        value: id,
      }))}
      selected={value?.id}
      title="Job listing"
      noOutline
      disabled={disabled}
      wide
    />
  );
}
