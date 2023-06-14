"use client";

import { Dropdown } from "@/app/_components/inputs/Dropdown";
import { Interviewer } from "prisma/prisma-client";

type Props = {
  data: Interviewer[];
};

export function InterviewerDropdown({ data }: Props) {
  return (
    <Dropdown
      onChange={() => null}
      options={data.map(({ name }) => ({
        label: name,
        value: name,
      }))}
      title="Interviewer"
      noOutline
    />
  );
}
