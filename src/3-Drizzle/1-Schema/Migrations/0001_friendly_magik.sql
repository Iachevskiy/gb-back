CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"middle_name" varchar(255),
	"last_name" varchar(255) NOT NULL,
	"telegram_id" bigint NOT NULL,
	"is_confirmed" boolean DEFAULT false,
	"two_factor_key" varchar(255)
);
