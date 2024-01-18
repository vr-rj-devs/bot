import { SubCommand } from "@_types/commands";
import { SlashCommandSubcommandBuilder } from "discord.js";

export default {
  isSubCommand: true,
  command: new SlashCommandSubcommandBuilder()
    .setName("info")
    .setDescription("Show information about the event"),
  execute: async (_, __) => {},
} as SubCommand;
