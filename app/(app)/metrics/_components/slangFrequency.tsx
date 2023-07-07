import { getResponses } from "../../_lib/server/getResponses";
import slangDictionary from "../slangDictionary.json";

interface Slang {
  index: number;
}

export async function SlangFrequency({ index }: Slang) {
  const responses = await getResponses();
  return (
    <div>
      {responses[index].wordFrequency && 
        Object.entries(responses[index].wordFrequency as Record<string, number>)
          .filter(([key, value]) => slangDictionary.includes(key.toLowerCase()))
          .map(([key, value]) => (
        <div key={key}>
          {key}: {value}
        </div>
      ))}
    </div>
  );
}