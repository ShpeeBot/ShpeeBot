exports.run = async (client, message, args, level) => {
  // eslint-disable-line no-unused-vars
  let pingMsg = await message.channel.send("Ping?");
  pingMsg.edit(
    `Pong! Latency is ${pingMsg.createdTimestamp -
      message.createdTimestamp}ms. API Latency is ${Math.round(
      client.ws.ping
    )}ms`
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "ping",
  category: "Miscelaneous",
  description: "It like... Pings. Then Pongs. And it's not Ping Pong.",
  usage: "ping"
};
