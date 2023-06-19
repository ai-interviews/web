"use client";

import { useEffect, useState } from "react";

type Props = {
  intervalMs: number;
  children: string;
};

export function Typewriter({ children, intervalMs }: Props) {
  const [text, setText] = useState("");

  useEffect(() => {
    (async () => {
      setText("");

      for (const char of children) {
        await new Promise((resolve) => setTimeout(resolve, intervalMs));

        setText((prev) => prev + char);
      }
    })();
  }, [children, intervalMs]);

  return (
    <div>
      <p>{text}</p>
    </div>
  );
}
