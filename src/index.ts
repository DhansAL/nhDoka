import { Client } from "discord.js";
import { IntentOptions } from "./config/IntentOptions";
import { connectDatabase } from "./database/connectDatabase";
import { onMessage } from "./events/onMessage";
import { validateEnv } from "./utils/validateEnv";

/*
TODO = ENABLE SENTRY BUG LOGGING
*/

(async () => {
  if (!validateEnv()) {
    return;
  }
  const nhDoka = new Client({
    intents: IntentOptions,
  });

  //   nhDoka.on("ready",async()=> await onReady(nhDoka));

  nhDoka.on("message", async (message) => await onMessage(message));
  await connectDatabase();
  await nhDoka.login(process.env.BOT_TOKEN);
})();
