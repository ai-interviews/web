import { getServerUser } from "../../../_lib/server/getServerUser";
import prisma from "../../../_lib/server/prismadb";
import { Prisma } from "@prisma/client";

export type AggregateMetrics = {
  date: Date;
  avgScore: number;
  avgTimeSeconds: number;
  avgQuietTimeSeconds: number;
  wordFrequency: Record<string, number>;
};

export const getAggregateMetrics = async ({
  startDate,
  endDate,
  groupBy = "month",
}: {
  startDate: Date;
  endDate: Date;
  groupBy?: "day" | "week" | "month";
}): Promise<AggregateMetrics[]> => {
  const userId = (await getServerUser()).id;

  const sql = Prisma.sql`
    WITH data AS (
      SELECT
        date_trunc(${groupBy}, i."date") AS "date",
        r."score",
        r."timeSeconds",
        r."quietTimeSeconds",
        (jsonb_each_text(r."wordFrequency")).*
      FROM "Response" r
      INNER JOIN "Interview" i ON r."interviewId" = i."id"
      WHERE i."userId" = ${userId} 
        AND i."date" BETWEEN ${startDate} AND ${endDate}
    )
    SELECT
      "date",
      CAST(ROUND(AVG("score")) AS INTEGER) AS "avgScore",
      CAST(ROUND(AVG("timeSeconds")) AS INTEGER) AS "avgTimeSeconds",
      CAST(ROUND(AVG("quietTimeSeconds")) AS INTEGER) AS "avgQuietTimeSeconds",
      jsonb_object_agg(key, value::float) as "wordFrequency"
    FROM data
    GROUP BY "date"
    ORDER BY "date";
  `;

  const metrics: AggregateMetrics[] = await prisma.$queryRaw(sql);

  console.log(metrics);

  return metrics;
};
