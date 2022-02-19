import Discord from "discord.js";

declare namespace BotTypes {
  class DiscordClient extends Discord.Client {
    commands: Discord.Collection<string, Command>;
  }

  type CommandExecFunction = (
    message: Discord.Message,
    args: Array<string>,
    client: BotTypes.DiscordClient
  ) => void;
  type CommandOptions = {
    name: string;
    description: string;
    exec: CommandExecFunction;
  };

  class Command {
    name: string;
    description: string;
    exec: CommandExecFunction;
  }

  type EnvVar = { token: string; commandPrefix: string };
}
