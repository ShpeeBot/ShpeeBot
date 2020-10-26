exports.run = async (client, message, args, level) => {
  if (!message.member.voice.channel)
    return message.reply("You must be in a voice channel!");
  if (!client.distube.isPlaying(message))
    return message.reply("You must be in a voice channel!");
  let mode = null;
  switch (args[0]) {
    case "off":
      mode = 0;
      break;
    case "song":
      mode = 1;
      break;
    case "queue":
      mode = 2;
      break;
  }
  mode = client.distube.setRepeatMode(message, mode);
  mode = mode ? (mode == 2 ? "Repeat queue" : "Repeat song") : "Off";
  message.channel.send(`🔁 | Set repeat mode to \`${mode}\``);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["repeat"],
  permLevel: "User"
};

exports.help = {
  name: "loop",
  category: "Music",
  description: "Toggle loop on the music queue",
  usage: "loop"
};
