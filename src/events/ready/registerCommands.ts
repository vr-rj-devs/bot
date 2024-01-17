import { CommandCollection } from "@commands";
import { ENV } from "@env";
import { REST, Routes } from "discord.js";

export default async () => {
  const rest = new REST().setToken(ENV.TOKEN);
  try {
    console.log(`Started refreshing ${CommandCollection.length} application (/) commands.`);
    const commandRoute = Routes.applicationGuildCommands(ENV.CLIENT_ID, ENV.GUILD_ID);
    const body = CommandCollection.map(({ data }) => data.toJSON());
    const data = (await rest.put(commandRoute, { body })) as [];

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
}