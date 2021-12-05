import { Message, MessageEmbed } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

import { CommandInt } from "../interfaces/CommandInt";
import CamperModel from "../models/CamperModel";

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
    try{
      await interaction.deferReply();
      const {user} = interaction;
      const text = interaction.options.getString("message");

      if(!text){
        await interaction.editReply({
          content: 
          "the message argument is requiered",
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

    
    }
  },
};
