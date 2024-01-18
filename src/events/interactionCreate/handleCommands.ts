import { Client, CommandInteraction } from "discord.js";
import { CommandCollection } from "@commands";

export default async (client: Client, interaction: CommandInteraction) => {
  if (interaction.isCommand()) {
    const { commandName } = interaction;
    const command = CommandCollection.find(({ command }) => commandName === command.name);
    command?.execute(client, interaction);
  }
};
