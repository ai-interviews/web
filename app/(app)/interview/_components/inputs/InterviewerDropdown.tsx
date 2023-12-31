"use client";

import { Dropdown } from "../../../../_components/inputs/Dropdown";
import { Interviewer } from "prisma/prisma-client";

type Props = {
  data: Interviewer[];
  onChange: (interviewer: Interviewer) => void;
  value?: Interviewer;
  disabled?: boolean;
};

export function InterviewerDropdown({
  data,
  onChange,
  value,
  disabled,
}: Props) {
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
      selected={value?.name}
      disabled={disabled}
      noOutline
    />
  );
}
