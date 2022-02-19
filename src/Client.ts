import Discord from "discord.js";
import Command from "./Command";

class Client extends Discord.Client {
  commands: Discord.Collection<string, Command>;

  constructor(options) {
    super(options);
    this.commands = new Discord.Collection();
  }
}

export default Client;
