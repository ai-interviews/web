import slangDictionary from "../slangDictionary.json";

interface WordFrequency {
  wordFrequency: Record<string, number>;
}

export async function SlangFrequency({ wordFrequency }: WordFrequency) {
  return (
    <div>
      {Object.entries(wordFrequency)
          .filter(([key, value]) => slangDictionary.includes(key.toLowerCase()))
          .map(([key, value]) => (
        <div key={key}>
          {key}: {value}
        </div>
      ))}
    </div>
  );
}