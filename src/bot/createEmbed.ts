import { EmbedBuilder } from "discord.js";

function createEmbedSucces(title: string, description: string): EmbedBuilder {
  return new EmbedBuilder({
    title: `${title} was modified`,
    description: `${title} was set to ${description}`,
    color: 0x007934,
  });
}

function createEmbedError(title: string): EmbedBuilder {
  return new EmbedBuilder({
    title: `Error when modifying ${title}`,
    color: 0xc72237,
  });
}

export { createEmbedError, createEmbedSucces };
