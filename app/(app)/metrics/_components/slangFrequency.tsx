import { getResponses } from "../../_lib/server/getResponses";
import slangDictionary from "../slangDictionary.json";

export async function SlangFrequency() {
  const responses = await getResponses();
  const index = 199;
  return (
    <div>
      {responses[index].wordFrequency && 
        Object.entries(responses[index].wordFrequency)
          .filter(([key, value]) => slangDictionary.includes(key.toLowerCase()))
          .map(([key, value]) => (
        <div key={key}>
          {key}: {value}
        </div>
      ))}
    </div>
  );
}