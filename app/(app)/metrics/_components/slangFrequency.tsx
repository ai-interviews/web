import { getResponses } from "../../_lib/server/getResponses";
import slangDictionary from "../slangDictionary.json";

export async function SlangFrequency() {
  const responses = await getResponses({ page: 0, limit: 3 });

  return (
    <div>
      {responses[0].wordFrequency && 
        Object.entries(responses[0].wordFrequency)
          .filter(([key, value]) => slangDictionary.includes(key.toLowerCase()))
          .map(([key, value]) => (
        <div key={key}>
          {key}: {value}
        </div>
      ))}
    </div>
  );
}