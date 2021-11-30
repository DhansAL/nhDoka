import { Message } from "discord.js";
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
}
}