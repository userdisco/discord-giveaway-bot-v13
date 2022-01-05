const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const manager = require("../../handlers/GiveawayClient");
const ms = require("ms");

module.exports = new Command({
  // options
  name: "resume",
  description: `resume Giveaway in your server`,
  userPermissions: ["MANAGE_MESSAGES"],
  category: "Giveaway",
  options: [
    {
      name: "id",
      description: `give me giveaway ID`,
      type: "STRING",
      required: true,
    },
  ],
  // command resume
  run: async ({ client, interaction, args }) => {
    // Code
    let ID = interaction.options.getString("id");
    manager
      .unpause(ID)
      .then((s) => {
        interaction.followUp(`Giveaway Resumed Successfully`);
      })
      .catch((e) => {
        console.log(e);
      });
  },
});
