import prisma from "@/app/_lib/server/prismadb";
import { Response } from "../../_lib/server/getResponses";
import slangDictionary from '../slangDictionary.json';

export const getResponses = async (): Promise<Response[]> => {
  const data = await prisma?.response.findMany({});
  return data as Response[];
};

export const getSlangFrequency = async (): Promise<Record<string, number>> => {
  let slangFrequency: Record<string, number> = {};
  const responses: Response[] = await getResponses();

  for (const response of responses) {
    if (typeof response.wordFrequency === 'object' && response.wordFrequency !== null) {
      const wordFrequency: Record<string, number> = response.wordFrequency as Record<string, number>;

      for (const word in wordFrequency) {
        if (slangDictionary.includes(word)) {
          if (word in slangFrequency) {
            slangFrequency[word] += wordFrequency[word];
          } else {
            slangFrequency[word] = wordFrequency[word];
          }
        }
      }
    }
  }

  return slangFrequency;
};