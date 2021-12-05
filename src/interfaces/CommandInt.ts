import {
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

export interface CommandInt {
  //V12 interface
  // name:string;
  // description:string;
  // run:(message: Message)=>Promise<void> //This means your function will be asynchronous (this is important later) and does not return a value.
  //v13
  data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
  run: (interaction: CommandInteraction) => Promise<void>;
}
