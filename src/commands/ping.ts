import Command from "../Command";

export default new Command({
  name: "ping",
  description: "Messages the user pong when they type ping",
  async exec(msg, args, client) {
    msg.reply("ping pong");
  },
});
