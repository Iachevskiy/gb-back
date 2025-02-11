import { serve } from "bun";
import { testRoute } from "./routes/testRoute";
import "./db.ts";

serve({
    fetch: testRoute,
    port: Number(process.env.PORT) || 3000,
});
