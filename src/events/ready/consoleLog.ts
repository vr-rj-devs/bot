import { Client } from "discord.js";

export default (c: Client<true>) => console.log(`Ready! Logged in as ${c.user.tag}`);
