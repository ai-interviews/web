import React, { Suspense } from "react";
import { SlangFrequency } from "./_components/slangFrequency";

export default function Metrics() {
  return (
    <div>
      <h1>Slang Metric</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <SlangFrequency />
      </Suspense>
    </div>
  );
}
