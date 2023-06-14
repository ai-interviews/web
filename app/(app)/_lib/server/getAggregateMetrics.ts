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
    WITH metrics AS (
      SELECT 
        date_trunc(${groupBy}, i."date") AS "date",
        AVG(r."score") AS "avgScore",
        AVG(r."timeSeconds") AS "avgTimeSeconds",
        AVG(r."quietTimeSeconds") AS "avgQuietTimeSeconds"
      FROM "Response" r
      INNER JOIN "Interview" i ON r."interviewId" = i."id"
      WHERE i."userId" = ${userId} AND i."date" BETWEEN ${startDate} AND ${endDate}
      GROUP BY date
    ),
    word_frequencies AS (
      SELECT
        date_trunc(${groupBy}, i."date") AS "date",
        jsondata.key AS "key",
        SUM(jsondata.value::float) AS "total"
      FROM "Response" r
      INNER JOIN "Interview" i ON r."interviewId" = i."id",
        jsonb_each_text("wordFrequency") AS jsondata
      WHERE i."userId" = ${userId}
      AND i."date" BETWEEN ${startDate} AND ${endDate}
      GROUP BY date, jsondata.key
    )
    SELECT
      metrics."date",
      metrics."avgScore",
      metrics."avgTimeSeconds",
      metrics."avgQuietTimeSeconds",
      jsonb_object_agg(key, total) as "wordFrequency"
    FROM metrics
    LEFT JOIN word_frequencies ON metrics."date" = word_frequencies."date"
    GROUP BY metrics."date", metrics."avgScore", metrics."avgTimeSeconds", metrics."avgQuietTimeSeconds"
    ORDER BY metrics."date";
  `;

  const metrics: AggregateMetrics[] = await prisma.$queryRaw(sql);

  return metrics;
};
