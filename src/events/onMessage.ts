import { Message } from "discord.js";
//message parameter with the Message type.
export const onMessage= async (message :Message)=>{ 
    console.log("checking onmessage", message.content)
}