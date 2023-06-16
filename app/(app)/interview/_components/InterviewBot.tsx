"use client";

import { Image } from "@/app/_components/Image";
import { Interview } from "ai-interview-sdk";
import { useMemo, useState } from "react";
import { Avatar } from "../../_components/Avatar";
import { Card } from "@/app/_components/Card";
import { Table } from "../../_components/Table/Table";
import { formatTime } from "../../_lib/client/formatTime";
import { MicrophoneIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Interviewer } from "prisma/prisma-client";
import { getCountryImageUrl } from "../../_lib/client/getCountryImageUrl";
import { InterviewWithMetrics } from "../../_lib/server/getInterviews";
import { Typewriter } from "../../_components/Misc/Typewriter";

type Props = {
  interviewer?: Interviewer;
  interviews: InterviewWithMetrics[];
};

export function InterviewBot({
  interviewer = {
    name: "Random interviewer",
    bio: "???",
    country: "",
    imageUrl: "",
  },
  interviews,
}: Props) {
  const interview = useMemo(() => new Interview(), []);
  const [isActive, setIsActive] = useState<boolean>(false);

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
        <div className="flex flex-col items-center gap-3 2xl:gap-5 w-full">
          {interviewer.imageUrl ? (
            <Avatar src={interviewer.imageUrl} name="Rachel" size="lg" />
          ) : (
            <UserCircleIcon width={215} />
          )}
          <div className="flex flex-col gap-1 2xl:gap-2 w-full">
            <span className="text-2xl">{interviewer.name}</span>
            <div className="flex flex-nowrap items-center gap-1.5">
              {interviewer.country && (
                <Image
                  className="h-2 w-4"
                  src={getCountryImageUrl(interviewer.country)}
                  alt="country flag"
                />
              )}
              <span>{interviewer.country}</span>
            </div>
            <span className=" text-sm 2xl:text-md leading-8">
              <Typewriter intervalMs={4}>{interviewer.bio}</Typewriter>
            </span>
          </div>
        </div>
        <div className="flex justify-center w-full pt-4 mt-auto">
          <button className="btn btn-outline w-2/3">Begin</button>
        </div>
      </div>

      {/* RIGHT VIEW - INACTIVE: PAST INTERVIEWS TABLE, ACTIVE: CHAT WINDOW */}

      <div className="flex-auto h-full py-5 px-8 w-80">
        <div className="text-3xl mb-5">Past interviews</div>
        <Table
          headers={[
            { label: "Interviewer" },
            { label: "Length" },
            { label: "Score" },
            { label: "Date" },
          ]}
          data={interviews.map(
            ({
              timeSeconds,
              interviewerName,
              interviewerImageUrl,
              interviewerCountry,
              avgScore,
              date,
            }) => [
              {
                type: "Person",
                data: {
                  name: interviewerName,
                  country: interviewerCountry,
                  image: interviewerImageUrl,
                },
              },
              {
                type: "Text",
                data: {
                  text: formatTime({ seconds: timeSeconds }),
                },
              },
              {
                type: "Text",
                data: {
                  text: `${avgScore} / 10`,
                },
              },
              {
                type: "Date",
                data: {
                  date,
                },
              },
            ]
          )}
        />
      </div>

      {/* <button
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
      </button> */}
    </Card>
  );
}
