"use client";

import { useEffect, useState } from "react";

type Props = {
  intervalMs: number;
  children: string;
};

export function Typewriter({ children, intervalMs }: Props) {
  const [text, setText] = useState<string>("");
  const [_, setIntervalId] = useState<NodeJS.Timer>();

  useEffect(() => {
    if (children) {
      let i = 0;
      setIntervalId((prevIntervalId) => {
        // Stop previous typewriter
        if (prevIntervalId) {
          clearInterval(prevIntervalId);
          setText("");
        }

        // Begin new typewriter
        const newIntervalId = setInterval(() => {
          if (i >= children.length - 1) {
            clearInterval(newIntervalId);
          }

          setText((prevContent) => prevContent + children[i++]);
        }, intervalMs);

        return newIntervalId;
      });
    }
  }, [children, intervalMs]);

  return (
    <div>
      <p>{text}</p>
    </div>
  );
}
