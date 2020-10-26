const Discord = require("discord.js");

module.exports = async (client, message, error) => {
  client.logger.error(
    `An error event was sent by Discord.js: \n${JSON.stringify(error)}`,
    "error"
  );
  const errorEmbed = new Discord.MessageEmbed()
    .setColor("RED")
    .addFields({
      name: "⁉️ Uh oh... something went wrong on our end",
      value: "If this keeps happening, please open an issue on our GitHub repo."
    })
    .setTimestamp()
    .setFooter("An error event was sent by Discord.js");

  message.channel.send(errorEmbed);
};
