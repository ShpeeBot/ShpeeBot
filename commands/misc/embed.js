const Discord = require("discord.js");
exports.run = (client, message, args, level) => {
  var m = args.join(" ");
  if (!m) return message.reply("Need content for the embed...");
  const embed = new Discord.MessageEmbed()
    .setDescription(m)
    .setColor([114, 137, 218]);
  message.channel.send({ embed });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "embed",
  category: "Miscelaneous",
  description: "Embeds something",
  usage: "embed [description]"
};
