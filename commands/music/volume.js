exports.run = async (client, message, args, level) => {
  if (!message.member.voice.channel)
    return message.reply("You must be in a voice channel!");
  if (!client.distube.isPlaying(message))
    return message.reply("There is nothing playing!");
  let volume = parseInt(args[0]);
  if (isNaN(volume))
    return message.reply("Please enter a valid number!");
  client.distube.setVolume(message, volume);
  message.channel.send(`✅ | Volume set to \`${volume}\``);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["vol"],
  permLevel: "User"
};

exports.help = {
  name: "stop",
  category: "Music",
  description: "Stop playing music while preserving the music queue",
  usage: "stop"
};
