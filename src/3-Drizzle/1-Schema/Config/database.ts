import { Pool } from "pg";

export const DBClient = new Pool({
    connectionString: process.env.DATABASE_URL,
});

DBClient.connect()
    .then(client => {
        console.log("✅ Успешное подключение к базе данных");
        client.release();
    })
    .catch(error => {
        console.error("❌ Ошибка подключения к базе данных:", error.message);
        process.exit(1);
    });
