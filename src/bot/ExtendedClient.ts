import { Client, GatewayIntentBits } from "discord.js";

export class ExtendedClientBot extends Client {
  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });
    this.start();
  }
  private start() {
    this.login(process.env.DISCORD_TOKEN);
  }
}
