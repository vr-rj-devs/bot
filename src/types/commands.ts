import {
  Client,
  CommandInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
} from "discord.js";

export interface Command {
  command: SlashCommandBuilder;
  categories: string[] | null;
  execute: (client: Client, interaction: CommandInteraction) => Promise<void>;
}
export interface SubCommand {
  isSubCommand: boolean;
  command: SlashCommandSubcommandBuilder;
  execute: (client: Client, interaction: CommandInteraction) => Promise<void>;
}
