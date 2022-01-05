const { Client, ApplicationCommand } = require("discord.js");
const fs = require("fs");

/**
 *
 * @param {Client} client
 */

module.exports = (client) => {
  try {
    client.arrayOfcommands = [];
    let commandcount = 0;
    fs.readdirSync("./commands").forEach((cmd) => {
      let commands = fs
        .readdirSync(`./commands/${cmd}/`)
        .filter((file) => file.endsWith(".js"));
      for (cmds of commands) {
        let pull = require(`../commands/${cmd}/${cmds}`);
        if (pull.options) {
          pull.options
            .filter((g) => g.type === "SUB_COMMAND")
            .forEach((sub) => {
              client.subcmd.set(sub.name, sub);
            });
        }
        if (pull.name) {
          client.commands.set(pull.name, pull);
          commandcount++;
          client.arrayOfcommands.push(pull);
        } else {
          continue;
        }
        if (pull.aliases && Array.isArray(pull.aliases))
          pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
      }
      try {
        client.on("ready", async () => {
          await client.application.commands
            .set(client.arrayOfcommands)
            .catch((e) => {
              console.log(e.message);
            });
        });
      } catch (e) {
        console.log(e.message);
      }
    });
    console.log(`[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[
      Loaded ${commandcount} commands
    ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]`);
  } catch (e) {
    console.log(e);
  }
};
