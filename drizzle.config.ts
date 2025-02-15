import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema:["./src/3-Drizzle/4-Entities/*", "./src/3-Drizzle/3-ManyToManyRelations/*", "./src/3-Drizzle/2-EntityRelation/*"],
  out: "./src/3-Drizzle/1-Schema/Migrations",
  dbCredentials: {
    host: process.env.DB_HOST || "localhost",
    port: 5432,
    user: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "postgres",
    database: process.env.POSTGRES_DB || "postgres",
    ssl: false,
    url: process.env.DATABASE_URL,
  },
});
