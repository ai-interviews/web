"use client";

import { useMemo, useState } from "react";
import { Card } from "@/app/_components/Card";
import { Interviewer } from "prisma/prisma-client";
import { InterviewWithMetrics } from "../../_lib/server/getInterviews";
import { InterviewerBio } from "./InterviewerBot/InterviewerBio";
import {
  InterviewChat,
  InterviewMessage,
} from "./InterviewerBot/InterviewChat";
import { InterviewTable } from "./InterviewerBot/InterviewTable";
import { Interview } from "ai-interview-sdk";

type Props = {
  interviewer?: Interviewer;
  interviews: InterviewWithMetrics[];
  interviewers: Interviewer[];
};

export function InterviewBot({
  interviewer: userSelectedInterviewer,
  interviewers,
  interviews,
}: Props) {
  // TODO: should be a random not 0 indexed
  const interviewer = userSelectedInterviewer || interviewers[0];

  const [isActive, setIsActive] = useState<boolean>(false);
  const [messages, setMessages] = useState<InterviewMessage[]>([]);
  const [messageInProgress, setMessageInProgress] = useState<string>("");

  const interview = useMemo(
    () =>
      new Interview({
        onSpeechRecognized: (text) => {
          setMessageInProgress(text);
        },
        onAudio: ({ text }) => {
          setMessages((prev) => [...prev, { sender: "interviewer", text }]);
        },
      }),
    []
  );

  const handleToggleInterview = () => {
    if (isActive) {
      interview.end();
      setIsActive(false);
    } else {
      interview.begin();
      setIsActive(true);
    }
  };

  const handleCandidateFinishedSpeaking = () => {
    setMessages((prev) => [
      ...prev,
      { sender: "candidate", text: messageInProgress },
    ]);
    setMessageInProgress("");

    interview.finishedSpeaking();
  };

  return (
    <Card
      className={`
        flex flex-row min-h-min h-full w-full border-2 rounded-lg px-8 
        transition-colors
        ${isActive ? "border-red-400" : "border-current"}
      `}
    >
      {/* LEFT VIEW - INTERVIEWER BIO */}

      <div
        className={`
        flex flex-col flex-auto w-20 h-full pr-5 2xl:pr-10 2xl:pl-2 2xl:py-5 
        border-r ${isActive ? "border-red-400" : "border-current"}
      `}
      >
        <InterviewerBio
          interviewer={interviewer}
          isActive={isActive}
          onBegin={() => interview.begin()}
        />

        <div className="flex justify-center w-full pt-4 mt-auto">
          <button
            className="btn btn-outline w-2/3"
            onClick={handleToggleInterview}
          >
            {isActive ? "End" : "Begin"}
          </button>
        </div>
      </div>

      {/* RIGHT VIEW - INACTIVE: PAST INTERVIEWS TABLE, ACTIVE: CHAT WINDOW */}

      <div
        className={`
        flex-auto h-full py-5 px-8 w-80
        ${isActive ? "flex items-end" : ""}
      `}
      >
        {isActive ? (
          <InterviewChat
            interviewerImageUrl={interviewer.imageUrl}
            messages={messages}
            onSendMessage={handleCandidateFinishedSpeaking}
            messageInProgress={messageInProgress}
          />
        ) : (
          <div className="max-h-full overflow-auto">
            <div className="text-3xl mb-5">Past interviews</div>
            <InterviewTable interviews={interviews} />
          </div>
        )}
      </div>
    </Card>
  );
}
