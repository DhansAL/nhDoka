import { Message, MessageEmbed } from "discord.js";
import { CommandInt } from "../interfaces/CommandInt";
import CamperModel from "../database/models/CamperModel";
import { CommandList } from "./_CommandList";

export const help: CommandInt = {
  name: "help",
  description: "Return information on the bot's available commands",
  run: async (message: Message) => {
    const helpEmbed = new MessageEmbed();
    helpEmbed.setTitle("Available Commands!");
    helpEmbed.setDescription("These are the available commands for this bot.");
    helpEmbed.addField(
      "Commands:",
      CommandList.map((el) => `\`!${el.name}\`: ${el.description}`).join("\n")
    );

    await message.channel.send(JSON.stringify(helpEmbed));
  },
};
