import { startStandaloneServer } from "@apollo/server/standalone";

import AppServer from "./server.ts"

export const initServer = async () => {
    const { url } = await startStandaloneServer(AppServer, {
        context: async ({ req }) => {
            // @ts-ignore
            const { query = "", operationName = "" } = req.body;

            // console.log('data', typeof req, query, operationName);
            // console.log('data context');
            return {};
        },
    });

    return url;
}

