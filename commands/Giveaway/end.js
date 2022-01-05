const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const manager = require("../../handlers/GiveawayClient");
const ms = require("ms");

module.exports = new Command({
  // options
  name: "end",
  description: `end Giveaway in your server`,
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
  // command end
  run: async ({ client, interaction, args }) => {
    // Code
    let ID = interaction.options.getString("id");

    manager.end(ID).then(s => {
        interaction.followUp(`Giveaway Ended Winner is Selected`)
    }).catch(e => {
        console.log(e)
    })
  },
});
