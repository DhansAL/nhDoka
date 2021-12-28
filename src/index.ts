import { Client } from "discord.js";
import { IntentOptions } from "./config/IntentOptions";
import { connectDatabase } from "./database/connectDatabase";
import { onInteraction } from "./events/onInteraction";
import { onReady } from "./events/onReady";
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

  nhDoka.on("ready", async () => await onReady(nhDoka));

  nhDoka.on(
    "interactionCreate", // interaction is deprecated
    async (interaction) => await onInteraction(interaction)
  );
  await connectDatabase();
  await nhDoka.login(process.env.BOT_TOKEN);
})();
