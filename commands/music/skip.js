const Discord = require("discord.js")
exports.run = async (client, message, args, level) => {
  if (!message.member.voice.channel)
    return message.reply("You must be in a voice channel!");
  if (!client.distube.isPlaying(message))
    return message.reply("There is nothing playing!");
  let queue = client.distube.skip(message);
  message.react("👍")
  const nowPlayingEmbed = new Discord.MessageEmbed()
    .setTitle("Now Playing")
    .setDescription("[${song.name}](${song.url}) [${song.user}]");
  message.channel.send(nowPlayingEmbed)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["next"],
  permLevel: "User"
};

exports.help = {
  name: "skip",
  category: "Music",
  description: "Play the next song in the queue",
  usage: "skip"
};
