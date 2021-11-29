import { Message } from "discord.js";


export interface CommandInt {
    name:string;
    description:string;
    run:(message: Message)=>Promise<void> //This means your function will be asynchronous (this is important later) and does not return a value.
}