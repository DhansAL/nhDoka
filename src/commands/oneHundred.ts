import { Message, MessageEmbed } from "discord.js";
import { CommandInt } from "../interfaces/CommandInt";
import CamperModel from "../models/CamperModel";




export const oneHundred: CommandInt = {

    name:"100",
    description:"creates 100 days of code updates",
    run:async (message:Message)=>{          
        const {author,channel,content} = message;
        const text = content.split(" ").slice(1).join(" ");

        let targetCamperData = await CamperModel.findOne({discordId:author.id});

        if(!targetCamperData){
            targetCamperData = await CamperModel.create({
                discordId:author.id,
                round:1,
                day:0,
                timestamp:Date.now(),
        });
        }
        targetCamperData.day++;
        
        if(targetCamperData.day > 100){
            targetCamperData.day = 1;
            targetCamperData.round++;
    }
    targetCamperData.timestamp = Date.now();
    await targetCamperData.save();

    const oneHundredEmbed =  new MessageEmbed();

    oneHundredEmbed.setTitle("100 days of code");
    oneHundredEmbed.setDescription(text);
    oneHundredEmbed.setAuthor(author.username+'#'+author.discriminator,author.displayAvatarURL());

    oneHundredEmbed.addField("Round",targetCamperData.round.toString(),true);
    oneHundredEmbed.addField("Day",targetCamperData.day.toString(),true);
    oneHundredEmbed.setFooter("Day completed: " + new Date(targetCamperData.timestamp).toLocaleDateString());// locale-specific string based on the location of bot's server.

    await channel.send(JSON.stringify(oneHundredEmbed));
    await message.delete();



}
} 