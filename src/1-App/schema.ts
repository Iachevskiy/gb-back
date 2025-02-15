import { mergeSchemas } from "@graphql-tools/schema";

import { drizzleGraphql } from "Drizzle/Schema/Config";
import { verify2FASchema } from "CustomSchemas/2FA/Verify";
import { generate2FASchema } from "CustomSchemas/2FA/Generate";

export default mergeSchemas({
    schemas: [drizzleGraphql.schema, verify2FASchema, generate2FASchema],
});
