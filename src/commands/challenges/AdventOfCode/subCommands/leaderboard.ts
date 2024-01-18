import { SlashCommandSubcommandBuilder, EmbedBuilder } from "discord.js";
import { bold, italic } from "discord.js";
import { SubCommand } from "@_types/commands";
import { ENV } from "@env";
import buttonPagination from "@util/buttonPagination";
import axios from "axios";

interface GetLeaderboardResponse {
  data: { leaderboard: { author: string; repo_url: string; time: number }[] };
}
export default {
  isSubCommand: true,
  command: new SlashCommandSubcommandBuilder()
    .setName("leaderboard")
    .setDescription("Gets the leaderboard for a given day and part")
    .addIntegerOption((opt) => opt.setName("day").setDescription("day").setRequired(true))
    .addIntegerOption((opt) => opt.setName("part").setDescription("part").setRequired(true)),
  async execute(_, interaction) {
    if (!interaction.isChatInputCommand()) return;
    const day = interaction.options.get("day", true).value;
    const part = interaction.options.get("part", true).value;

    await interaction.reply({ content: "Fetching leaderboard...", ephemeral: true });

    try {
      const url = `${ENV.BS_BASE_URL}/aoc/leaderboard/${day}/${part}`;
      const { data }: GetLeaderboardResponse = await axios.get(url, {
        headers: {
          "CF-Access-Client-Id": ENV.BS_ACCESS_CLIENT_ID,
          "CF-Access-Client-Secret": ENV.BS_ACCESS_CLIENT_SECRET,
        },
      });

      let leaderboardLength = 0;
      // prettier-ignore
      const leaderboard = await data.leaderboard.reduce(async (acc, { author, repo_url, time }, i) => {
          const user = (await interaction.guild?.members.fetch(author))?.user;
          if (!user) return acc;

          const tag = user.username.match(/\d+$/)?.[0] ?? "";
          const untaggedUsername = user.username.slice(0, user.username.length - tag.length);
          const taggedUsername = `${untaggedUsername}${tag ? `#${tag}` : ""}`;
          const entry = bold(`${i + 1} - [${taggedUsername}](${repo_url}) → ${italic(`${time}ms_`)}`);
          leaderboardLength += entry.length + 1;
          return [...(await acc), entry];
        }, 
        Promise.resolve([]) as Promise<string[]>
      );

      if (leaderboard.length === 0) return await interaction.editReply({ content: "Ta vazio fi" });

      const embeds: EmbedBuilder[] = [];
      const maxDescriptionSize = 4096;
      const isMultipage = leaderboardLength > maxDescriptionSize;
      let description = "";
      for (let i = 0; i < leaderboard.length; i++) {
        const entry = leaderboard[i];
        const nextEntry = leaderboard.at(i + 1);
        description += entry + "\n";

        if (!nextEntry || description.length + nextEntry.length > maxDescriptionSize) {
          const page = embeds.length + 1;
          const title = `Advent Of Code ${day}-${part} ${isMultipage ? `| Page ${page}` : ""}`;
          embeds.push(new EmbedBuilder().setTitle(title).setDescription(description));
          description = "";
        }
      }

      await buttonPagination(interaction, embeds);
    } catch (e) {
      await interaction.editReply(JSON.stringify(e, null, 4));
    }
  },
} as SubCommand;
