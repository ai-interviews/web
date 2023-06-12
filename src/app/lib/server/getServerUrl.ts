import { headers } from "next/headers";

export const getServerUrl = () =>
  new URL(headers().get("referer") || "http://localhost:3000/");
