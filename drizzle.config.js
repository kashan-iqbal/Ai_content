import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/utils/AiSchema.tsx",
  dbCredentials: {
    url: "postgresql://neondb_owner:KW0DsMd9IgUe@ep-round-surf-a5cyd3oz.us-east-2.aws.neon.tech/neondb?",
  },
});
