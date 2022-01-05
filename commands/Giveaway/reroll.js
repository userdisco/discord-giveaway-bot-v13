const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const manager = require("../../handlers/GiveawayClient");
const ms = require("ms");

module.exports = new Command({
  // options
  name: "reroll",
  description: `reroll Giveaway in your server`,
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
  // command reroll
  run: async ({ client, interaction, args }) => {
    // Code
    let ID = interaction.options.getString("id");
    manager
      .reroll(ID, {
        messages: {
          congrat:
            ":tada: New winner(s): {winners}! Congratulations, you won **{this.prize}**!\n{this.messageURL}",
          error: "No valid participations, no new winner(s) can be chosen!",
        },
      })
      .then((s) => {
        interaction.followUp(`Giveaway Successfully Rerolled`);
      })
      .catch((e) => {
        console.log(e);
      });
  },
});
