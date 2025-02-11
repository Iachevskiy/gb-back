import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as dbSchema from './models/testModel.ts';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.connect()
    .then(client => {
        console.log("✅ Успешное подключение к базе данных");
        client.release();
    })
    .catch(error => {
        console.error("❌ Ошибка подключения к базе данных:", error.message);
        process.exit(1);
    });

export const db = drizzle({client:pool, schema: dbSchema});
