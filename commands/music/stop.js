exports.run = async (client, message, args, level) => {
  if (!message.member.voice.channel)
    return message.reply("You must be in a voice channel!");
  if (!client.distube.isPlaying(message))
    return message.reply("There is nothing playing!");
  client.distube.stop(message);
  message.react("👋");
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["disconnect", "dc", "leave"],
  permLevel: "User"
};

exports.help = {
  name: "stop",
  category: "Music",
  description: "Stop playing music while preserving the music queue",
  usage: "stop"
};
