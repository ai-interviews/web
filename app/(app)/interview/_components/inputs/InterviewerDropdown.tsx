"use client";

import { Dropdown } from "../../../../_components/inputs/Dropdown";
import { Interviewer } from "prisma/prisma-client";

type Props = {
  data: Interviewer[];
  onChange: (interviewer: Interviewer) => void;
};

export function InterviewerDropdown({ data, onChange }: Props) {
  return (
    <Dropdown
      onChange={(name) =>
        onChange(data.find((interviewer) => interviewer.name === name)!)
      }
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
