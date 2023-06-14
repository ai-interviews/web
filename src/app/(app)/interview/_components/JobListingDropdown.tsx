"use client";

import { Dropdown } from "@/app/_components/inputs/Dropdown";
import { Interviewer } from "prisma/prisma-client";

type Props = {
  data: string[];
};

export function JobListingDropdown({ data }: Props) {
  return (
    <Dropdown
      onChange={() => null}
      options={data.map((name) => ({
        label: name,
        value: name,
      }))}
      title="Job listing"
      noOutline
    />
  );
}
