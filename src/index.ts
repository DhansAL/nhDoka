import { Client } from "discord.js";
import { connectDatabase } from "./database/connectDatabase";
import { onMessage } from "./events/onMessage";
import { validateEnv } from "./utils/validateEnv";


//instanciating bot via IIFE
(async () =>{
    if(!validateEnv()){
        return ;
    }
    const nhDoka = new Client({
        shards: "auto",
        intents:[]
      });
      nhDoka.on("ready",()=>console.log('connected to Discord brah'))
      nhDoka.on("message", async (message) => await onMessage(message));
      await connectDatabase();
      await nhDoka.login(process.env.BOT_TOKEN);
})();