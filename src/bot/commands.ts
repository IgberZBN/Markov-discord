import {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  REST,
  Routes,
} from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const commands: {}[] = [
  {
    name: "config-length",
    description: "Define the number of words in text generation",
    default_member_permissions: Number(PermissionFlagsBits.BanMembers),
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
    name: "config-sampling",
    description: "Define the number of words in text generation",
    default_member_permissions: Number(PermissionFlagsBits.BanMembers),
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
    name: "config-delay",
    description: "Sets the delay time for sending the message",
    default_member_permissions: Number(PermissionFlagsBits.BanMembers),
    options: [
      {
        name: "minutes",
        description: "Time in minutes",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },
  {
    name: "db-size",
    default_member_permissions: Number(PermissionFlagsBits.BanMembers),
    description:
      "Displays in KB the size of the database and the number of messages stored",
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
