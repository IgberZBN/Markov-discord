import { CacheType, ChatInputCommandInteraction } from "discord.js";
import { createEmbedError, createEmbedSucces } from "./createEmbed";
import configParam from "../param";
import { updateInterval } from "..";

function getParam(
  interaction: ChatInputCommandInteraction<CacheType>,
  param: string,
): number {
  const value = interaction.options.getNumber(param);
  if (!value) {
    interaction.reply({ embeds: [createEmbedError(param)] });
    throw new Error("");
  }
  return value;
}

function updateWordsCount(
  interaction: ChatInputCommandInteraction<CacheType>,
): void {
  configParam.wordsCount = getParam(interaction, "size");
  interaction.reply({
    embeds: [createEmbedSucces("Words count", `${configParam.wordsCount}`)],
  });
}

function updateSampleSize(
  interaction: ChatInputCommandInteraction<CacheType>,
): void {
  configParam.sampleSize = getParam(interaction, "size");
  interaction.reply({
    embeds: [createEmbedSucces("Sample size", `${configParam.sampleSize}`)],
  });
}

function updateDelaySend(
  interaction: ChatInputCommandInteraction<CacheType>,
): void {
  configParam.delay = getParam(interaction, "minutes") * 60000;
  updateInterval();
  interaction.reply({
    embeds: [
      createEmbedSucces("Delay send", `${configParam.delay / 60000} minutes`),
    ],
  });
}

export { updateDelaySend, updateSampleSize, updateWordsCount };
