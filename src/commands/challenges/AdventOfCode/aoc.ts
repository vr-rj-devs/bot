import { SlashCommandBuilder } from "discord.js";
import { Command } from "@_types/commands";
import path from "path";
import { getAllSubCommands } from "@util/files.commands";

const subCommands = getAllSubCommands(path.join(__dirname, "subCommands"));

export default {
  command: (() => {
    const builder = new SlashCommandBuilder().setName("aoc").setDescription("aoc");
    for (const { command } of subCommands) {
      builder.addSubcommand(command);
    }
    return builder;
  })(),
  async execute(client, interaction) {
    if (!interaction.isChatInputCommand()) return;

    const subCommand = interaction.options.getSubcommand();
    await subCommands
      .find(({ command }) => command.name === subCommand)
      ?.execute(client, interaction);
  },
} as Command;
