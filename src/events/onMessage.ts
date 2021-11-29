import { Message } from "discord.js";
import { CommandList } from "../commands/_CommandList";
//message parameter with the Message type.
export const onMessage= async (message :Message)=>{ 
    const prefix = "!";

if (!message.content.startsWith(prefix)) return;
if(message.author.bot)return;

for(const Command of CommandList){
    if(message.content.startsWith(prefix + Command.name)){
        await Command.run(message);
        break;
    }
}

}