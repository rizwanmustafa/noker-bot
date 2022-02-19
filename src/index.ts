import Discord, { Client, Intents } from "discord.js";
import { existsSync as fileExistsSync, readFileSync } from "fs";
import { resolve as resolvePath } from "path";

const loadEnvVars = (): { token: string } => {
  const localFilePath = resolvePath(__dirname, "env.json");
  const outerFilePath = resolvePath(__dirname, "../env.json");

  const finalPath = fileExistsSync(localFilePath)
    ? localFilePath
    : fileExistsSync(outerFilePath)
    ? outerFilePath
    : undefined;

  if (finalPath === undefined) {
    console.log("No env.json file provided! Exiting!");
    process.exit(1);
  }

  return JSON.parse(readFileSync(finalPath).toString());
};

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on("messageCreate", (msg) => {
  if (msg.author.bot) return;
  console.log(`${msg.author.tag} says: ${msg.content}`);
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

const envVars: { token: string } = loadEnvVars();
client.login(envVars.token);
