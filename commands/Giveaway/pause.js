const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const manager = require("../../handlers/GiveawayClient");
const ms = require("ms");

module.exports = new Command({
  // options
  name: "pause",
  description: `pause Giveaway in your server`,
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
  // command pause
  run: async ({ client, interaction, args }) => {
    // Code
    let ID = interaction.options.getString("id");

    manager
      .pause(ID, {
        isPaused: true,
      })
      .then((s) => {
        interaction.followUp(`Giveaway Paused Successfully...`);
      })
      .catch((e) => {
        console.log(e);
      });
  },
});
