import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { Command } from "@_types/commands";

export default {
  command: new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!"),
  async execute(interaction: CommandInteraction) {
    await interaction.reply("Pong!");
  },
} as Command;