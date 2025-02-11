import { db } from "../db";
import { testModel } from "../models/testModel";

export const testRoute = async (req: Request) => {
    if (req.method === "GET") {
        const data = await db.select().from(testModel);
        return new Response(JSON.stringify(data), { status: 200 });
    }
    return new Response("Method Not Allowed", { status: 405 });
};
