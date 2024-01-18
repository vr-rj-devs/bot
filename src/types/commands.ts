import { CommandInteraction, SlashCommandBuilder, SlashCommandSubcommandBuilder } from "discord.js";

export interface Command {
  command: SlashCommandBuilder;
  category: string | null;
  execute: (interaction: CommandInteraction) => Promise<void>;
}
export interface SubCommand {
  isSubCommand: boolean;
  command: SlashCommandSubcommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
}