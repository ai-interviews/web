"use client";

import { MicrophoneIcon, StopIcon } from "@heroicons/react/24/outline";
import { Interview } from "ai-interview-sdk";
import { useMemo, useState } from "react";

export function InterviewBot() {
  const interview = useMemo(() => new Interview(), []);
  const [isActive, setIsActive] = useState<boolean>(false);
  const iconSize = 30;

  const handleToggleInterview = () => {
    if (isActive) {
      interview.end();
      setIsActive(false);
    } else {
      interview.begin();
      setIsActive(true);
    }
  };

  return (
    <div
      className={`
        flex items-center justify-center h-full w-full border-2 rounded-lg
        ${isActive ? "border-red-400" : "border-current"}
        transition-colors
      `}
    >
      <button
        className={`
          btn btn-outline h-20 w-20 rounded-full 
          ${isActive ? "border border-red-400 text-red-400" : "btn-ghost"}
        `}
        onClick={handleToggleInterview}
      >
        {isActive ? (
          <>
            <span className="absolute loading loading-ring loading-lg"></span>
            <StopIcon height={iconSize} width={iconSize} />
          </>
        ) : (
          <MicrophoneIcon height={iconSize} width={iconSize} />
        )}
      </button>
    </div>
  );
}
