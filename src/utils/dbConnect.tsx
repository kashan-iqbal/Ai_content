import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./AiSchema";
const sql = neon(
  "postgresql://neondb_owner:KW0DsMd9IgUe@ep-round-surf-a5cyd3oz.us-east-2.aws.neon.tech/neondb?"
);

export const db = drizzle(sql, { schema });
