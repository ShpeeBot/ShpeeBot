exports.run = async (client, message, args, level) => {
  if (!message.member.voice.channel)
    return message.reply("You must be in a voice channel!");
  let string = args.join(" ");
  if (!string)
    return message.reply("Please enter a song url or query to search.");
  try {
    client.distube.play(message, string);
  } catch (e) {
    message.channel.send(`❌ | Error: \`${e}\``);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["p"],
  permLevel: "User"
};

exports.help = {
  name: "play",
  category: "Music",
  description: "Play a song/video from YouTube",
  usage: "play [youtube video title/URL]"
};
