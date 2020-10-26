module.exports = async client => {
  if (!client.user.bot) {
    client.logger.error(
      "This code must be run on a bot user. Running this bot code on a normal user may not work as expected and is against the Discord Terms of Service.",
      "error"
    );
    return process.exit(0);
  }

  // Why await here? Because the ready event isn't actually ready, sometimes
  // guild information will come in *after* ready. 1s is plenty, generally,
  // for all of them to be loaded.
  await client.wait(1000);

  client.appInfo = await client.fetchApplication();
  setInterval(async () => {
    client.appInfo = await client.fetchApplication();
  }, 60000);

  require("../modules/dashboard")(client);

  // Log that the bot is online.
  client.logger.log(
    `${client.user.tag}, ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers. Bot Version: ${client.version}`,
    "ready"
  );

  // Ensure that any guild added while the bot was offline gets a default configuration.
  var g = [];
  client.guilds.cache.forEach(guild => g.push(guild.id));

  for (var i = 0; i < g.length; i++) {
    if (!client.settings.get(g[i])) {
      client.settings.set(g[i], client.config.defaultSettings);
    }
  }

  var game = client.config.playingGame
    .replace("{{prefix}}", client.config.defaultSettings.prefix)
    .replace("{{guilds}}", client.guilds.cache.size)
    .replace("{{version}}", client.version);

  client.user.setPresence({
    game: {
      name: game,
      type: client.config.statusType
    },
    status: client.config.status
  });
};
