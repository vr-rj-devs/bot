import "module-alias/register";
import { Client } from "discord.js";
import { ENV } from "@env";
import eventHandler from "@handlers/eventHandler";

const client = new Client({ intents: [] });

eventHandler(client);

client.login(ENV.TOKEN);
