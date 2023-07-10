import { z } from "zod";

export const logErrorMessage = ({
  message,
  error,
}: {
  message: string;
  error: unknown;
}) => {
  let errorMessage = message;

  if (error instanceof z.ZodError) {
    for (const subError of error.errors) {
      errorMessage += `Error in field ${subError.path.join(".")}: ${
        subError.message
      }\n`;
    }
  } else {
    errorMessage += ": " + error;
  }

  console.error(errorMessage);

  return errorMessage;
};
