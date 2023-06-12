"use client";

import { Interview } from "ai-interview-sdk";
import { useMemo } from "react";

export default function Home() {
  const interview = useMemo(() => new Interview(), []);

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button onClick={() => interview.begin()}>Start</button>
      <button onClick={() => interview.end()}>Stop</button>
      <button onClick={() => interview.finishedSpeaking()}>
        Finished speaking
      </button>
    </div>
  );
}
