"use client";

import { truncateText } from "@/app/(app)/_lib/client/truncateText";
import { Dropdown } from "@/app/_components/inputs/Dropdown";
import { Job } from "@prisma/client";

type Props = {
  jobs: Job[];
};

export function JobListingDropdown({ jobs }: Props) {
  return (
    <Dropdown
      onChange={() => null}
      options={jobs.map(({ title }) => ({
        label: truncateText({ text: title, length: 45 }),
        value: title,
      }))}
      title="Job listing"
      noOutline
      wide
    />
  );
}
