import { Intents } from "discord.js";
import Client from "./Client";
import fs from "fs";
import { resolve as resolvePath } from "path";
import { BotTypes } from "./types/types";

const loadConfig = (): BotTypes.EnvVar => {
  const localFilePath = resolvePath(__dirname, "env.json");
  const outerFilePath = resolvePath(__dirname, "../env.json");

  const finalPath = fs.existsSync(localFilePath)
    ? localFilePath
    : fs.existsSync(outerFilePath)
    ? outerFilePath
    : undefined;

  if (finalPath === undefined) {
    console.log("No env.json file provided! Exiting!");
    process.exit(1);
  }

  return JSON.parse(fs.readFileSync(finalPath).toString());
};

const loadCommands = () => {
  const commandFiles = fs
    .readdirSync(resolvePath(__dirname, "./commands/"))
    .filter((file) => file.endsWith("js"));
  commandFiles.forEach(async (file) => {
    const commandImport = await import(
      resolvePath(__dirname, "./commands/", file)
    );
    const command: BotTypes.Command = commandImport.default;

    client.commands.set(command.name, command);
    console.log(`Command ${command.name} loaded!`);
  });
};

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("messageCreate", (msg) => {
  if (msg.author.bot) return;

  if (!msg.content.startsWith(config.commandPrefix)) return;

  // Contains everything except the command prefix
  const commandData = msg.content
    .substring(config.commandPrefix.length)
    .split(" ");
  const commandName = commandData[0];
  const args = commandData.slice(1);

  const command = client.commands.get(commandName);
  if (command) {
    command.exec(msg, args, client);
    console.log(`Executed command ${command.name}`);
  }
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

const config: BotTypes.EnvVar = loadConfig();
loadCommands();

client.login(config.token);
