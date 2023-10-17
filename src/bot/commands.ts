import { ApplicationCommandOptionType, REST, Routes } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const commands: {}[] = [
  {
    name: "words-count",
    description: "Define the number of words in text generation",
    options: [
      {
        name: "size",
        description: "generation size",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },
  {
    name: "sample-size",
    description: "Define the number of words in text generation",
    options: [
      {
        name: "size",
        description: "sample size",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },
  {
    name: "delay-send",
    description: "Sets the delay time for sending the message",
    options: [
      {
        name: "minutes",
        description: "Time in minutes",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },
];

const rest: REST = new REST({ version: "10" }).setToken(
  process.env.DISCORD_TOKEN as string,
);

(async (): Promise<void> => {
  try {
    console.log("slash commands...");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_APP_ID as string,
        process.env.DISCORD_GUILD_ID as string,
      ),
      { body: commands },
    );
    console.log("done");
  } catch (error) {
    console.error(error);
  }
})();
