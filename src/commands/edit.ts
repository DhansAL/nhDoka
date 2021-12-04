import { Message, MessageEmbed } from "discord.js";
import { CommandInt } from "../interfaces/CommandInt";
import CamperModel from "../models/CamperModel";

export const edit: CommandInt = {
  name: "edit",
  description: "edits a previous 100 days of code post",
  run: async (message: Message) => {
    const { author, content, channel } = message;

    const [, targetId, ...text] = content.split(" ");
    const targetMessage = await channel.messages.fetch(targetId);

    if (!targetMessage) {
      await channel.send("That does not appear to be a valid message ID.");
      return;
    }

    const targetEmbed = targetMessage.embeds[0];
    if (
      targetEmbed.author?.name !==
      author.username + "#" + author.discriminator
    ) {
      await channel.send(
        "This does not appear to be your 100 Days of Code post. You cannot edit it."
      );
      return;
    }
    targetEmbed.setDescription(text.join(" "));

    await targetMessage.edit(JSON.stringify(targetEmbed));
    await message.delete();
  },
};
