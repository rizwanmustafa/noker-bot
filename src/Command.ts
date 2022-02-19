import { BotTypes } from "./types/types";

class Command {
  name: string;
  description: string;
  exec: BotTypes.CommandExecFunction;

  constructor(options: BotTypes.CommandOptions) {
    this.name = options.name;
    this.description = options.description;
    this.exec = options.exec;
  }
}

export default Command;
