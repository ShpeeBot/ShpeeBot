exports.run = async (client, message, level) => {
  let queue = client.distube.getQueue(message);
  if (!queue)
    return message.channel.send("Queue is empty!");
  let q = queue.songs
    .map((song, i) => {
      return `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${
        song.formattedDuration
      }\``;
    })
    .join("\n");
  message.channel.send(`**Server Queue**\n${q}`);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["q"],
  permLevel: "User"
};

exports.help = {
  name: "queue",
  category: "Music",
  description: "Stop playing music while preserving the music queue",
  usage: "stop"
};
