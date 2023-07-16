import { Card } from "../../../_components/Card";
import { ResponseTable } from "../../_components/ResponseTable/ResponseTable";
import { getResponses } from "../../_lib/server/getResponses";

export async function LatestQuestions() {
  const responses = await getResponses({ page: 0, limit: 100 });

  return (
    <Card className="h-min">
      <div className="pb-2.5 pl-4 text-2xl">Activity</div>
      <ResponseTable data={responses} />
    </Card>
  );
}
