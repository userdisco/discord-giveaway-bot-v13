const { GiveawaysManager } = require("discord-giveaways");
const Enmap = require("enmap");
const client = require('../index')
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


manager.on('giveawayReactionAdded',async (giveaway , member) => {
  member.send(`Your Entry Successfully Accepted \n Giveaway in <#${giveaway.channelId}>`)
})