import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Interviewer } from "prisma/prisma-client";
import { Avatar } from "../../../_components/Avatar";
import { Typewriter } from "../../../_components/Misc/Typewriter";
import { getCountryImageUrl } from "../../../_lib/client/getCountryImageUrl";
import { Image } from "@/app/_components/Image";

type Props = {
  interviewer?: Interviewer;
};

export function InterviewerBio({
  interviewer = {
    name: "Random interviewer",
    bio: "???",
    country: "",
    imageUrl: "",
    voice: "",
  },
}: Props) {
  return (
    <div className="flex w-full flex-col items-center gap-3 2xl:gap-5">
      {interviewer.imageUrl ? (
        <Avatar src={interviewer.imageUrl} name="Rachel" size="lg" />
      ) : (
        <UserCircleIcon width={215} />
      )}
      <div className="flex w-full flex-col gap-1 2xl:gap-2">
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
        <span className=" 2xl:text-md text-sm leading-8">
          <Typewriter intervalMs={4}>{interviewer.bio}</Typewriter>
        </span>
      </div>
    </div>
  );
}
