const { GiveawaysManager, Giveaway } = require("discord-giveaways");
const { MessageEmbed, Interaction } = require("discord.js");
const Enmap = require("enmap");
const client = require("../index");
const giveawayDB = new Enmap({ name: "giveaways" });

const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
  async getAllGiveaways() {
    return giveawayDB.fetchEverything().array();
  }
  async saveGiveaway(messageId, giveawayData) {
    giveawayDB.set(messageId, giveawayData);
    return true;
  }

  async editGiveaway(messageId, giveawayData) {
    giveawayDB.set(messageId, giveawayData);
    return true;
  }

  async deleteGiveaway(messageId) {
    giveawayDB.delete(messageId);
    return true;
  }

  async refreshStorage() {
    return client.shard.broadcastEval(() =>
      this.giveawaysManager.getAllGiveaways()
    );
  }
  /**
   * @param {Giveaway} giveaway
   */
  generateMainEmbed(giveaway) {
    let mainEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`Giveaway Started`)
      .setDescription(
        `>>> ** [React to Enter in Giveaway](${giveaway.messageURL}) **`
      )
      .addFields([
        {
          name: `**🎁 Prize **`,
          value: `>>> ${giveaway.prize}`,
        },
        {
          name: `**⏲️  Duration **`,
          value: `>>> ${giveaway.duration.toLocaleString()}`,
        },
        {
          name: `**👍 Hosted By **`,
          value: `>>> ${giveaway.hostedBy}`,
        },
      ]);

    return mainEmbed;
  }
};

const manager = new GiveawayManagerWithOwnDatabase(client, {
  default: {
    botsCanWin: false,
    embedColor: "#FF0000",
    embedColorEnd: "#000000",
    reaction: "🎉",
  },
});

module.exports = manager;

manager.on("giveawayReactionAdded", async (giveaway, member) => {
  member.send(
    `Your Entry Successfully Accepted \n Giveaway in <#${giveaway.channelId}>`
  );
});

manager.on("giveawayReactionRemoved", async (giveaway, member, reaction) => {
  member.send(`Your Entry is Rejected...`);
});
