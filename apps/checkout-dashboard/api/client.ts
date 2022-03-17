import { createClient } from "urql";

export const client = createClient({
  url: process.env.API_URL,
});
