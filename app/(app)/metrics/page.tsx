import React, { Suspense } from "react";
import { SlangFrequency } from "./_components/slangFrequency";
import { getInterviewResponses } from "../_lib/server/getResponses";

export default function Metrics() {

  // const responses = getInterviewResponses("b06be56e-123e-43c4-bca3-272804607371");

  return (
    <div>
      <h1>Slang Metric</h1>
      <Suspense fallback={<div>Loading...</div>}>
        {/* <SlangFrequency wordFrequency={response}/> */}
        <SlangFrequency wordFrequency={{yo:1, my:1, name:1, is:1, Sara:1}}/>
      </Suspense>
    </div>
  );
}
