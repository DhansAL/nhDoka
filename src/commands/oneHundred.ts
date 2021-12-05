import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInt } from "../interfaces/CommandInt";
import { getCamperData } from "../modules/getCamperData";
import { updateCamperData } from "../modules/updateCamperData";
import { MessageEmbed } from "discord.js";

export const oneHundred: CommandInt = {
  data: new SlashCommandBuilder()
    .setName("100")
    .setDescription("check in  for the 100 days of code challenge")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("the message to go in your 100 days of code update")
        .setRequired(true)
    ) as SlashCommandBuilder,

  run: async (interaction) => {
    try {
      await interaction.deferReply();
      const { user } = interaction;
      const text = interaction.options.getString("message");

      if (!text) {
        await interaction.editReply({
          content: "the message argument is requiered",
        });
        return;
      }

      const targetCamper = await getCamperData(user.id);

      if (!targetCamper) {
        await interaction.editReply({
          content:
            "There is an error with the database lookup. Please try again later.",
        });
        return;
      }
      const updatedCamper = await updateCamperData(targetCamper);
      if (!updatedCamper) {
        await interaction.editReply({
          content:
            "There is an error with the database update. Please try again later.",
        });
        return;
      }
      const oneHundredEmbed = new MessageEmbed();
      oneHundredEmbed.setTitle("100 Days of Code");
      oneHundredEmbed.setDescription(text);
      oneHundredEmbed.setAuthor(
        user.username + "#" + user.discriminator,
        user.displayAvatarURL()
      );
      oneHundredEmbed.addField("Round", updatedCamper.round.toString(), true);
      oneHundredEmbed.addField("Day", updatedCamper.day.toString(), true);
      oneHundredEmbed.setFooter(
        "Day completed: " +
          new Date(updatedCamper.timestamp).toLocaleDateString()
      );

      await interaction.editReply({ embeds: [oneHundredEmbed] });
    } catch (err) {
      console.log("100 command", err);
    }
  },
};
