const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = new Command({
  // options
  name: "help",
  description: `See my Commands...`,
  userPermissions: ["SEND_MESSAGES"],
  category: "Information",
  // command start
  run: async ({ client, interaction, args }) => {
    // Code
    let btnraw = new MessageActionRow().addComponents([
      new MessageButton()
        .setStyle("LINK")
        .setLabel("Invite Now")
        .setURL(
          `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`
        ),
    ]);
    let homeEmbed = new MessageEmbed()
      .setColor(ee.embed_color)
      .setFooter({ text: ee.embed_footertext, iconURL: ee.embed_footericon })
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`>>> Total ${client.commands.size} Commands`)
      .setTitle(`Information About ${client.user.username}`);

    const commands = (category) => {
      return client.commands
        .filter((cmd) => cmd.category === category)
        .map((cmd) => `\`${cmd.name}\``);
    };

    try {
      for (let i = 0; i < client.categories.length; i++) {
        const current = client.categories[i];
        const items = commands(current);
        homeEmbed.addField(
          `** ${current.toUpperCase()} \`[${items.length}]\` **`,
          `>>> ${items.join(" ' ")}`
        );
      }
    } catch (e) {
      console.log(e);
    }

    interaction
      .followUp({ embeds: [homeEmbed], components: [btnraw] })
      .catch((e) => console.log(e));
  },
});
