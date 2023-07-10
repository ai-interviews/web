"use client";

import { Avatar } from "@/app/(app)/_components/Avatar";
import { Image } from "@/app/_components/Image";
import { useClientUser } from "@/app/_hooks/useClientUser";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";

type Props = {
  interviewerImageUrl: string;
  messages: string[];
  onSendMessage: () => void;
  messageInProgress?: string;
  isLoadingResponse?: boolean;
  isCompletePhrase?: boolean;
};

export function InterviewChat({
  interviewerImageUrl,
  messages,
  onSendMessage,
  messageInProgress,
  isLoadingResponse,
  isCompletePhrase,
}: Props) {
  const { user } = useClientUser();

  return (
    <div className="flex h-full max-h-full w-full flex-col justify-end space-y-3">
      <div className="flex max-h-[calc(100%-3rem)] flex-col-reverse overflow-y-auto">
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
      <div className="flex items-center gap-2">
        <input
          type="text"
          className="border-3 input-bordered input w-full text-sm "
          value={messageInProgress}
          onChange={() => null}
        />
        <button
          className="btn-ghost btn px-3"
          onClick={onSendMessage}
          disabled={!isCompletePhrase}
        >
          <PaperAirplaneIcon width={24} />
        </button>
      </div>
    </div>
  );
}