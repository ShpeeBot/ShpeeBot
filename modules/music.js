const Discord = require("discord.js")
const DisTube = require("distube");

module.exports = (client, message) => {
  // Queue status template
  const status = queue =>
    `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter ||
      "Off"}\` | Loop: \`${
      queue.repeatMode
        ? queue.repeatMode == 2
          ? "All Queue"
          : "This Song"
        : "Off"
    }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
  
  // All the embeds needed in different situations
  const nowPlayingEmbed = new Discord.MessageEmbed()
    .setTitle("Now Playing")
    .setDescription("[${song.name}](${song.url}) [${song.user}]");
  
  const addedSongEmbed = new Discord.MessageEmbed()
    .addField("Queued [${song.name}](${song.url}) [${song.user}]")
  
  // Send the related embed for the event
  client.distube
    .on("playSong", (message, queue, song) =>
      message.channel.send(nowPlayingEmbed)
    )
    .on("addSong", (message, queue, song) =>
      message.channel.send(addedSongEmbed)
    )
    .on("▶️ |playList", (message, queue, playlist, song) =>
      message.channel.send(
        `▶️ | Play \`${playlist.title}\` playlist (${
          playlist.total_items
        } songs).\nRequested by: ${song.user}`
      ),
      message.channel.send(nowPlayingEmbed)
    )
    .on("addList", (message, queue, playlist) =>
      message.channel.send(
        `✅ | Added \`${playlist.title}\` playlist (${
          playlist.total_items
        } songs) to queue\n${status(queue)}`
      )
    )
    .on("error", (message, err) =>
      message.channel.send(`❌ | An error ocurred: ${err}`)
    );
};
