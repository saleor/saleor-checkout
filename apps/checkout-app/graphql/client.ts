import { API_URL } from "@constants";
import { createClient } from "urql";

export const client = createClient({
  url: API_URL,
});
