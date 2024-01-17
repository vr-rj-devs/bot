import "module-alias/register";
import { Client, Events } from "discord.js";
import { ENV } from "@env";
import eventHandler from "@handlers/eventHandler";
import { CommandCollection } from "@commands";

const client = new Client({ intents: [] });

eventHandler(client);

client.on(Events.InteractionCreate, (interaction) => {
  if (interaction.isCommand()) {
    CommandCollection.find(({ command }) => interaction.commandName === command.name)?.execute(interaction);
  }
});

client.login(ENV.TOKEN);
