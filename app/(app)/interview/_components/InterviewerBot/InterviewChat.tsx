import { Image } from "@/app/_components/Image";
import { useClientUser } from "@/app/_lib/client/hooks/useClientUser";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

export type InterviewMessage = {
  sender: "interviewer" | "candidate";
  text: string;
};

type Props = {
  interviewerImageUrl: string;
  messages: InterviewMessage[];
  onSendMessage: () => void;
  messageInProgress?: string;
};

export function InterviewChat({
  interviewerImageUrl,
  messages,
  onSendMessage,
  messageInProgress,
}: Props) {
  const { user } = useClientUser();

  return (
    <div className="w-full flex flex-col gap-2">
      {messages.map(({ sender, text }, i) => (
        <div
          key={i}
          className={`
            chat ${sender === "interviewer" ? "chat-start" : "chat-end"}
          `}
        >
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <Image
                src={
                  sender === "interviewer"
                    ? interviewerImageUrl
                    : user?.image || ""
                }
                alt="avatar"
              />
            </div>
          </div>
          <div className="chat-bubble">{text}</div>
        </div>
      ))}
      <div className="flex items-center gap-2 mt-2">
        <input
          type="text"
          className="input input-bordered w-full border-3 text-sm "
          value={messageInProgress}
          onChange={() => null}
        />
        <button className="btn btn-ghost px-3" onClick={onSendMessage}>
          <PaperAirplaneIcon width={24} />
        </button>
      </div>
    </div>
  );
}
