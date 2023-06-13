import { Card } from "@/app/_components/Card";
import { ResponseTable } from "../../_components/ResponseTable/ResponseTable";
import { getResponses } from "../../_lib/server/getResponses";

export async function LatestQuestions() {
  const responses = await getResponses();

  return (
    <Card>
      <div className="text-2xl pl-4 pb-2.5">Activity</div>
      <ResponseTable data={responses} />
    </Card>
  );
}
