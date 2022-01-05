const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const manager = require("../../handlers/GiveawayClient");
const ms = require("ms");

module.exports = new Command({
  // options
  name: "start",
  description: `Start Giveaway in your server`,
  userPermissions: ["MANAGE_MESSAGES"],
  category: "Giveaway",
  options: [
    {
      name: "channel",
      description: `ping a channel for giveaway`,
      type: "CHANNEL",
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
  // command start
  run: async ({ client, interaction, args }) => {
    // Code
    let channel = interaction.options.getChannel("channel");
    let duration = interaction.options.getString("duration");
    let winCount = interaction.options.getNumber("wincount");
    let prize = interaction.options.getString("prize");

    manager
      .start(channel, {
        prize: prize,
        duration: ms(duration),
        winnerCount: winCount,
        hostedBy: interaction.member,
        messages: {
          giveaway: "🎉🎉 **GIVEAWAY** 🎉🎉",
          giveawayEnded: "🎉🎉 **GIVEAWAY ENDED** 🎉🎉",
          drawing: "Drawing: {timestamp}",
          dropMessage: "Be the first to react with 🎉 !",
          inviteToParticipate: "React with 🎉 to participate!",
          winMessage:
            "Congratulations, {winners}! You won **{this.prize}**!\n{this.messageURL}",
          embedFooter: "{this.winnerCount} winner(s)",
          noWinner: "Giveaway cancelled, no valid participations.",
          hostedBy: "Hosted by: {this.hostedBy}",
          winners: "Winner(s):",
          endedAt: "Ended at",
        },
      })
      .then((s) => {
        interaction.followUp(`Giveaway Started in ${channel}`);
      })
      .catch((e) => {
        console.log(e);
      });
  },
});
