import { initServer } from "App/index.ts";

initServer()
    .then((url)=> {
        console.log(`🚀 Server ready at ${url}`);
    })

