"use client";

import { Avatar } from "@/app/(app)/_components/Avatar";
import { Image } from "@/app/_components/Image";
import { useClientUser } from "@/app/_hooks/useClientUser";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import TextareaAutosize from "react-textarea-autosize";
import { AnimatedMicrophone } from "./AnimatedMicrophone";
import { useEffect, useRef, useState } from "react";

type Props = {
  interviewerImageUrl: string;
  messages: string[];
  onSendMessage: () => void;
  messageInProgress?: string;
  setMessageInProgress?: (v: string) => void;
  isTextOnly?: boolean;
  isLoadingResponse?: boolean;
  isCompletePhrase?: boolean;
  isActiveMicrophone?: boolean;
};

export function InterviewChat({
  interviewerImageUrl,
  messages,
  onSendMessage,
  messageInProgress,
  setMessageInProgress,
  isTextOnly,
  isLoadingResponse,
  isCompletePhrase,
  isActiveMicrophone,
}: Props) {
  const { user } = useClientUser();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [infoMessage, setInfoMessage] = useState<string>("Not listening");

  useEffect(() => {
    if (isActiveMicrophone && isCompletePhrase) {
      setInfoMessage("Click to finish response");
    }

    if (isActiveMicrophone && !isCompletePhrase) {
      setInfoMessage("Processing...");
    }

    inputRef?.current?.focus();
  }, [isActiveMicrophone, isCompletePhrase]);

  return (
    <div className="flex h-full min-h-full w-full flex-col justify-end space-y-3">
      <div className="flex max-h-[70vh] min-h-[calc(100%-3rem)] flex-col-reverse overflow-y-auto">
        <div className="space-y-1 pr-10">
          {messages.map((message, i) => {
            const isInterviewer = i % 2 === 0;
            return (
              <div
                key={i}
                className={classNames(
                  "chat",
                  isInterviewer ? "chat-start" : "chat-end"
                )}
              >
                <div className="chat-image avatar">
                  <div className="w-12 rounded-full">
                    <Avatar
                      src={isInterviewer ? interviewerImageUrl : user?.image}
                      name={user?.name || ""}
                      size="sm"
                    />
                  </div>
                </div>
                <div className="chat-bubble">{message}</div>
              </div>
            );
          })}
          {isLoadingResponse && (
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <Image src={interviewerImageUrl} alt="avatar" />
                </div>
              </div>
              <div className="chat-bubble flex items-center justify-center">
                <span className="loading loading-dots loading-md"></span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="divider" />

      <div className="flex items-center justify-center gap-2">
        {isTextOnly ? (
          <>
            <TextareaAutosize
              className="border-3 textarea-bordered textarea w-full resize-none pt-3 text-sm"
              value={messageInProgress}
              onChange={(e) => setMessageInProgress?.(e.target.value)}
              ref={inputRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSendMessage();
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
            />
            <button
              className="btn-ghost btn px-3"
              onClick={onSendMessage}
              disabled={!isCompletePhrase}
            >
              <PaperAirplaneIcon width={24} />
            </button>
          </>
        ) : (
          <AnimatedMicrophone
            active={isActiveMicrophone || false}
            onClick={onSendMessage}
            isClickable={isCompletePhrase}
          />
        )}
      </div>
      {!isTextOnly && <div className="text-center text-xs">{infoMessage}</div>}
    </div>
  );
}
