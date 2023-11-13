import { SlashCommandBuilder, CommandInteraction } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName('pang')
    .setDescription('Replies with Pung!'),
  async execute(interaction: CommandInteraction) {
    await interaction.reply('Pung!');
  },
};