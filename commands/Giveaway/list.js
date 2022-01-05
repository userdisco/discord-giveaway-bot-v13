const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const manager = require("../../handlers/GiveawayClient");
const ms = require("ms");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  // options
  name: "list",
  description: `Get list of current guild giveaways`,
  userPermissions: ["MANAGE_MESSAGES"],
  category: "Giveaway",
  // command resume
  run: async ({ client, interaction, args }) => {
    // Code
    let giveaways = await manager.giveaways
      .filter((g) => g.guildId === interaction.guildId)
      .map((g, i) => {
        return `\`${i + 1}\` [Giveaway ${i + 1}](${g.messageURL}) ${
          g.hostedBy
        }`;
      });

      interaction.followUp({embeds : [
          new MessageEmbed()
          .setColor('RANDOM')
          .setTitle(`** All Giveaways of ${interaction.guild.name} **`)
          .setDescription(giveaways.join('\n\n').substr(0,3000))
          .setFooter({text : `Coded By Kabir Singh`,iconURL : interaction.guild.iconURL({dynamic : true})})
      ]})
  },
});
