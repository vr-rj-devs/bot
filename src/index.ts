import "module-alias/register";
import { REST, Routes, Client, Events } from "discord.js";
import { CommandCollection } from "@commands";
import { ENV } from "@env";
import eventHandler from "@handlers/eventHandler";

const rest = new REST().setToken(process.env.TOKEN ?? "");

(async () => {
  try {
    console.log(`Started refreshing ${CommandCollection.length} application (/) commands.`);

    const data: [] = await rest.put(
      Routes.applicationGuildCommands(ENV.CLIENT_ID ?? "", ENV.GUILD_ID ?? ""),
      { body: CommandCollection.map(({ data }) => data.toJSON()) },
    ) as [];

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();

const client = new Client({ intents: [] });

eventHandler(client);

client.on(Events.InteractionCreate, (interaction) => {
  if (interaction.isCommand()) {
    CommandCollection.find(({ data }) => interaction.commandName === data.name)?.execute(interaction);
  }
});

client.login(ENV.TOKEN);
