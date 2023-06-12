import { Card } from "@/app/components/Card";
import { ResponseTable } from "../../components/ResponseTable/ResponseTable";
import { getResponses } from "../../lib/db/getResponses";

export async function LatestQuestions() {
  const responses = await getResponses();

  return (
    <Card>
      <div className="text-2xl pl-4 pb-2.5">Activity</div>
      <ResponseTable data={responses} />
    </Card>
  );
}
