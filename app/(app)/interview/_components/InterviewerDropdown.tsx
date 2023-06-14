"use client";

import { Dropdown } from "../../../_components/inputs/Dropdown";
import { Interviewer } from "prisma/prisma-client";

type Props = {
  data: Interviewer[];
};

export function InterviewerDropdown({ data }: Props) {
  return (
    <Dropdown
      onChange={() => null}
      options={data.map(({ name, imageUrl }) => ({
        label: name,
        value: name,
        imageUrl,
      }))}
      title="Interviewer"
      noOutline
    />
  );
}
