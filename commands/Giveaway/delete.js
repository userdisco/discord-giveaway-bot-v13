const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const manager = require("../../handlers/GiveawayClient");
const ms = require("ms");

module.exports = new Command({
  // options
  name: "delete",
  description: `delete Giveaway in your server`,
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
  // command delete
  run: async ({ client, interaction, args }) => {
    // Code
    let ID = interaction.options.getString("id");
    manager.delete(ID,true)
    .then(s => {
        interaction.followUp(`Giveaway Successfully Deleted`)
    }).catch(e => {
        console.log(e)
    })
  },
});
