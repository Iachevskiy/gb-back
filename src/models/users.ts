import { pgTable, uuid, text } from "drizzle-orm/pg-core";

export default pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    lastName: text("last_name").notNull(), // Фамилия
    firstName: text("first_name").notNull(), // Имя
    middleName: text("middle_name"), // Отчество (может быть пустым)
    // twoFaKey: text("2fa_key"), // 🔑 Ключ для 2FA
    // isConnected2fa: boolean("is_connected_2fa").default(false), // ✅ Подключен ли 2FA
});
