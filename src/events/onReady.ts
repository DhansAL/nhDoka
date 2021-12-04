// changes according to discord v13
import { REST } from "@discordjs/rest";
import { APIApplicationCommandOption, Routes } from "discord-api-types/v9";
import { CommandList } from "../commands/_CommandList";
import { Client } from "discord.js";

export const onReaady = async (nhDoka: Client): Promise<void> => {
  try {
    const rest = new REST({ version: "9" }).setToken(
      process.env.BOT_TOKEN as string
    );

    //array of <{}>[] data of specific commands
    const commandData: {
      name: string;
      description: string;
      type?: number;
      options?: APIApplicationCommandOption[];
    }[] = [];

    CommandList.forEach((command) => commandData.push(command.data.toJSON()));
    await rest.put(
      Routes.applicationGuildCommands(
        nhDoka.user?.id || "missing token",
        process.env.GUILD_ID as string
      ),
      { body: commandData }
    );
    console.log("info", "nhDoka has connected to discord!");
  } catch (err) {
    console.log("oops onReady event error", err);
  }
};
