const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const manager = require("../../handlers/GiveawayClient");
const ms = require("ms");

module.exports = new Command({
  // options
  name: "edit",
  description: `edit Giveaway in your server`,
  userPermissions: ["MANAGE_MESSAGES"],
  category: "Giveaway",
  options: [
    {
      name: "id",
      description: `give giveaway ID`,
      type: "STRING",
      required: true,
    },
    {
      name: "duration",
      description: `give giveaway duration`,
      type: "STRING",
      required: true,
    },
    {
      name: "wincount",
      description: `give winnercount for giveaway`,
      type: "NUMBER",
      required: true,
    },
    {
      name: "prize",
      description: `give prize for giveaway`,
      type: "STRING",
      required: true,
    },
  ],
  // command edit
  run: async ({ client, interaction, args }) => {
    // Code
    let ID = interaction.options.getString("id");
    let duration = interaction.options.getString("duration");
    let winCount = interaction.options.getNumber("wincount");
    let prize = interaction.options.getString("prize");

    manager
      .edit(ID, {
        addTime: duration,
        newPrize: prize,
        newWinnerCount: winCount,
      })
      .then((s) => {
        interaction.followUp(`Giveaway Successfully Edited`);
      })
      .catch((e) => {
        console.log(e);
      });
  },
});
