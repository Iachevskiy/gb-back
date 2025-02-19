import { startStandaloneServer } from "@apollo/server/standalone";

import AppServer from "./server.ts"

export const initServer = async () => {
    const { url } = await startStandaloneServer(AppServer, {
        listen: { host: "0.0.0.0", port: 4000 },
        context: async () => {
            // @ts-ignore
            // const { query = "", operationName = "" } = req.body;

            // console.log('data', typeof req, query, operationName);
            // console.log('data context');
            return {};
        },
    });

    return url;
}

