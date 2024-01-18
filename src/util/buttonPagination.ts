import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CommandInteraction,
  ComponentType,
  EmbedBuilder,
} from "discord.js";

export default async (
  interaction: CommandInteraction,
  pages: EmbedBuilder[] | ((interaction: CommandInteraction) => Promise<EmbedBuilder[]>),
  options?: { time?: number; content?: string },
) => {
  try {
    if (!interaction || !pages || pages.length === 0) throw new Error("Invalid arguments");
    if (!interaction.deferred && !interaction.replied) await interaction.deferReply();

    if (!Array.isArray(pages)) pages = await pages(interaction);
    if (pages.length === 1) {
      return await interaction.editReply({
        content: options?.content ?? "",
        embeds: pages,
        components: [],
      });
    }
    const prev = new ButtonBuilder()
      .setCustomId("prev")
      .setEmoji("⬅️")
      .setStyle(ButtonStyle.Primary)
      .setDisabled(true);

    const home = new ButtonBuilder()
      .setCustomId("home")
      .setEmoji("🏠")
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(true);

    const next = new ButtonBuilder()
      .setCustomId("next")
      .setEmoji("➡️")
      .setStyle(ButtonStyle.Primary);

    const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(prev, home, next);

    let index = 0;

    const msg = await interaction.editReply({
      content: options?.content ?? "",
      embeds: [pages[index]],
      components: [buttons],
    });

    const mc = msg.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: options?.time ?? 30 * 1000,
    });

    const { ephemeral } = interaction;
    mc.on("collect", async (i) => {
      if (!Array.isArray(pages)) pages = await pages(interaction);
      if (i.user.id !== interaction.user.id) {
        await i.reply({ content: "You are not allowed to do this", ephemeral: true });
        return;
      }

      await i.deferUpdate();

      if (i.customId === "prev" && index > 0) index--;
      else if (i.customId === "home") index = 0;
      else if (i.customId === "next" && index < pages.length - 1) index++;

      prev.setDisabled(index === 0);
      home.setDisabled(index === 0);
      next.setDisabled(index === pages.length - 1);

      if (ephemeral) await interaction.editReply({ embeds: [pages[index]], components: [buttons] });
      else await msg.edit({ embeds: [pages[index]], components: [buttons] });

      mc.resetTimer();
    });

    mc.on("end", async () => {
      if (!Array.isArray(pages)) pages = await pages(interaction);
      if (ephemeral) {
        await interaction.editReply({ embeds: [pages[index]], components: [] }).catch();
      } else {
        await msg.edit({ embeds: [pages[index]], components: [] }).catch();
      }
    });

    return msg;
  } catch (err) {
    console.log(err);
  }
};
