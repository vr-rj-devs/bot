import { Client } from "discord.js";
import path from "path";
import { getAllFiles, getAllFolders } from "@util/files";

export default (client: Client) => {
  const eventFolders = getAllFolders(path.join(__dirname, "..", "events"));

  for (const eventFolder of eventFolders) {
    const eventFiles = getAllFiles(eventFolder);
    eventFiles.sort((a, b) => a.localeCompare(b));

    const eventName = eventFolder.replace(/\\/g, "/").split("/").pop();
    if (!eventName) continue;

    client.on(eventName, async (arg) => {
      for (const eventFile of eventFiles) {
        const eventFunction = require(eventFile).default;
        await eventFunction(client, arg);
      }
    });
  }
};
