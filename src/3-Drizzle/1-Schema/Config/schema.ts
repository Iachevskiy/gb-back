import { drizzleModels } from './models';
import { DBClient } from "./database.ts";
import { drizzle } from "drizzle-orm/node-postgres";
import { buildSchema } from 'drizzle-graphql';


const db = drizzle({client:DBClient, schema: drizzleModels});

export const drizzleGraphql = buildSchema(db);
