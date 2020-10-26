const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  // eslint-disable-line no-unused-vars
  var time = Date.now();

  const embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setTitle("Bot Info")
    .setDescription(
      `ShpeeBot is an open source multi-purpose Discord bot. \n Type [prefix]help in a text channel for commands`
    )
    .addFields(
      { name: "GitHub Repository", value: "https://github.com/ShpeeBot/ShpeeBot" },
      { name: "\u200B", value: "\u200B" },
      { name: "Discord.js Version", value: `v${Discord.version}`, inline: true },
      { name: "Node Version", value: `${process.version}`, inline: true },
      { name: "Bot Version", value: `${client.version}`, inline: true }
    )
    .setFooter(`Time taken: ${Date.now() - time}ms`);
  message.channel.send({ embed });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["about", "inf"],
  permLevel: "User"
};

exports.help = {
  name: "info",
  category: "System",
  description: "Provides some bot info",
  usage: "info"
};
