"use client"
import { useState, useEffect } from "react";

export default function MetricPage() {
  const [slangFrequency, setSlangFrequency] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchSlangFrequency = async () => {
      const res = await fetch("/api/slangFrequency");
      const data = await res.json();
      setSlangFrequency(data);
    };

    fetchSlangFrequency();
  }, []);

  return (
    <div>
      <h1>Metrics</h1>
      <pre>{JSON.stringify(slangFrequency, null, 2)}</pre>
    </div>
  );
}
