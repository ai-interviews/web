"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/app/_components/Card";
import { Interviewer, Job, User } from "@prisma/client";
import { InterviewWithMetrics } from "../../../_lib/server/getInterviews";
import { InterviewerBio } from "./InterviewerBio";
import { InterviewChat } from "./InterviewChat";
import { InterviewTable } from "./InterviewTable";
import { useToast } from "@/app/_hooks/useToast";
import { callBackend } from "@/app/_lib/server/callBackend";
import {
  ApiCreateInterviewBody,
  ApiCreateInterviewResp,
} from "@/app/api/interview/_lib/createInterview";
import {
  ApiCreateResponseBody,
  ApiCreateResponseResp,
} from "@/app/api/response/_lib/createResponse";
import { useRouter } from "next/navigation";
import {
  ApiUpdateInterviewBody,
  ApiUpdateInterviewResp,
} from "@/app/api/interview/_lib/updateInterview";
import { ResponseMetricsEventData } from "ai-interview-sdk/dist/types";
import { Interview } from "ai-interview-sdk";
import classNames from "classnames";

type Props = {
  interviewer?: Interviewer;
  interviews: InterviewWithMetrics[];
  interviewers: Interviewer[];
  user: User;
  job?: Job;
  onInterviewStart?: () => void;
  onInterviewEnd?: () => void;
};

export function InterviewBot({
  interviewer: userSelectedInterviewer,
  interviewers,
  interviews,
  user,
  job,
  onInterviewStart,
  onInterviewEnd,
}: Props) {
  const showToast = useToast();
  const router = useRouter();
  const interviewer = userSelectedInterviewer || interviewers[0];

  // Interview state
  const [isActive, setIsActive] = useState<boolean>(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [messageInProgress, setMessageInProgress] = useState<string>("");
  const [isLoadingResponse, setIsLoadingResponse] = useState<boolean>(true);
  const [isCompletePhrase, setIsCompletePhrase] = useState<boolean>(false);

  // Database state
  const [interviewId, setInterviewId] = useState<string>("");
  const [responseMetrics, setResponseMetrics] =
    useState<ResponseMetricsEventData>();
  const [interviewLengthSeconds, setInterviewLengthSeconds] =
    useState<number>();

  const interview = useMemo(
    () =>
      new Interview(
        {
          onRecognitionStarted: async () => {
            try {
              onInterviewStart?.();
              const res = await callBackend<
                ApiCreateInterviewResp,
                ApiCreateInterviewBody
              >({
                url: "/api/interview",
                method: "POST",
                body: {
                  interviewerName: interviewer.name,
                },
              });
              setInterviewId(res.interview.id);
            } catch (error) {
              console.error(error);
              showToast({
                type: "danger",
                text: "There was an error starting the interview.",
              });
            }
          },
          onSpeechRecognized: ({ text, isCompletePhrase }) => {
            if (isCompletePhrase) {
              setIsCompletePhrase(true);
            } else {
              setIsCompletePhrase(false);
            }

            setMessageInProgress(text);
          },
          onResponseAudio: ({ text }) => {
            setIsLoadingResponse(false);
            setMessages((prev) => [...prev, text]);
          },
          onResponseMetrics: async (metrics) => {
            setResponseMetrics(metrics);
          },
          onInterviewMetrics: async (metrics) => {
            setInterviewLengthSeconds(metrics.lengthSeconds);
          },
        },
        {
          interviewerOptions: {
            name: interviewer.name,
            bio: interviewer.bio,
            voice: interviewer.voice as any,
          },
          ...(job?.title && {
            jobOptions: {
              title: job.title,
              description: job.description,
            },
          }),
          candidateName: user.name.split(" ")[0],
        }
      ),
    [
      interviewer.name,
      interviewer.bio,
      interviewer.voice,
      showToast,
      user.name,
      job?.title,
      job?.description,
      onInterviewStart,
    ]
  );

  useEffect(() => {
    if (responseMetrics) {
      (async () => {
        try {
          await callBackend<ApiCreateResponseResp, ApiCreateResponseBody>({
            url: "/api/response",
            method: "POST",
            body: {
              interviewId,
              timeSeconds: responseMetrics.answerTimeSeconds,
              ...responseMetrics,
            },
          });
          setResponseMetrics(undefined);
        } catch (error) {
          console.error(error);
          showToast({
            type: "danger",
            text: "There was an error starting the interview.",
          });
        }
      })();
    }
  }, [responseMetrics, interviewId, showToast]);

  useEffect(() => {
    if (interviewLengthSeconds) {
      (async () => {
        try {
          await callBackend<ApiUpdateInterviewResp, ApiUpdateInterviewBody>({
            url: "/api/interview",
            method: "PUT",
            body: {
              id: interviewId,
              data: {
                timeSeconds: interviewLengthSeconds,
              },
            },
          });
          setInterviewLengthSeconds(undefined);
          router.refresh();
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [interviewLengthSeconds, interviewId, router]);

  const handleToggleInterview = () => {
    if (isActive) {
      // onInterviewEnd?.();

      // Call interview SDK end handler
      interview.end();

      // Clear state
      setMessageInProgress("");
      setMessages([]);
      setIsActive(false);
      setIsLoadingResponse(true);

      // Refetch past interviews
      router.refresh();
    } else {
      interview.begin();
      setIsActive(true);
    }
  };

  const handleCandidateFinishedSpeaking = () => {
    if (messageInProgress.length > 0) {
      setMessages((prev) => [...prev, messageInProgress]);
      setMessageInProgress("");
      setIsLoadingResponse(true);
      setIsCompletePhrase(false);

      interview.finishedSpeaking();
    }
  };

  return (
    <Card
      className={`
        flex h-[calc(100%-5rem)] w-full flex-row rounded-lg border-2 px-8 
        transition-colors
        ${isActive ? "border-red-400" : "border-current"}
      `}
    >
      {/* LEFT VIEW - INTERVIEWER BIO */}

      <div
        className={`
        flex h-full w-20 flex-auto flex-col border-r pr-5 2xl:py-5 2xl:pl-2 
        2xl:pr-10 ${isActive ? "border-red-400" : "border-current"}
      `}
      >
        <InterviewerBio
          interviewer={interviewer}
          isActive={isActive}
          onBegin={() => interview.begin()}
        />

        <div className="mt-auto flex w-full justify-center pt-4">
          <button
            className="btn-outline btn w-2/3"
            onClick={handleToggleInterview}
          >
            {isActive ? "End" : "Begin"}
          </button>
        </div>
      </div>

      {/* RIGHT VIEW - PAST INTERVIEWS TABLE (INACTIVE), CHAT WINDOW (ACTIVE) */}

      <div
        className={classNames(
          "h-full w-80 flex-auto px-8 py-5",
          isActive ? "flex items-end" : ""
        )}
      >
        {isActive ? (
          <InterviewChat
            interviewerImageUrl={interviewer.imageUrl}
            messages={messages}
            onSendMessage={handleCandidateFinishedSpeaking}
            messageInProgress={messageInProgress}
            isLoadingResponse={isLoadingResponse}
            isCompletePhrase={isCompletePhrase}
          />
        ) : (
          <div className="h-full overflow-auto">
            <div className="mb-5 text-3xl">Past interviews</div>
            <InterviewTable interviews={interviews} />
          </div>
        )}
      </div>
    </Card>
  );
}
