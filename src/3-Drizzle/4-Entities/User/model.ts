import { pgTable, uuid, varchar, bigint, boolean } from "drizzle-orm/pg-core";

export default pgTable("user", {
    id: uuid("id").defaultRandom().primaryKey(),
    firstName: varchar("first_name", { length: 255 }).notNull(),
    middleName: varchar("middle_name", { length: 255 }), // Отчество (не обязательно)
    lastName: varchar("last_name", { length: 255 }).notNull(), // Фамилия
    telegramId: bigint("telegram_id", { mode: "number" }).notNull(), // Telegram ID (bigint, так как у Telegram ID длинные числа)
    isConfirmed: boolean("is_confirmed").default(false), // Подтвержден
    twoFactorKey: varchar("two_factor_key", { length: 255 }) // 2FA ключ
});
