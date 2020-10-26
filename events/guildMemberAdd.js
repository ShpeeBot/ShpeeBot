// This event executes when a new member joins a server. Let's welcome them!

// Using discord.js
const Discord = require("discord.js");

module.exports = (client, member) => {
  // Load the guild's settings
  const settings = client.getSettings(member.guild);

  // If welcome is off, don't proceed (don't welcome the user)
  if (settings.welcomeEnabled !== "true") return;

  // Replace the placeholders in the welcome message with actual data
  const welcomeMessage = settings.welcomeMessage.replace(
    "{{user}}",
    member.user.tag
  );

  // Send the welcome message to the welcome channel
  // There's a place for more configs here.
  member.guild.channels.cache
    .find(c => c.name === settings.welcomeChannel)
    .send(welcomeMessage)
    .catch(console.error);

  const logWelcome = new Discord.RichEmbed()
    .setColor("GREEN")
    .setTitle("New Member")
    .addField("User tag", member.user.tag)
    .addField("User ID", member.user.id);

  if (settings.logNewMember === "true") {
    member.guild.channels
      .find("name", settings.modLogChannel)
      .send({ embed: logWelcome })
      .catch(e =>
        client.log(
          "log",
          `Unable to send message to modLogChannel (${settings.modLogChannel}) on ${member.guild.name} (${member.guild.id}): \n ${e}`,
          "Error"
        )
      );
  }
};
