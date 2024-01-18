import "module-alias/register";
import { Client, IntentsBitField } from "discord.js";
import { ENV } from "@env";
import eventHandler from "@handlers/eventHandler";

const client = new Client({ intents: [IntentsBitField.Flags.Guilds] });

eventHandler(client);

client.login(ENV.TOKEN);
