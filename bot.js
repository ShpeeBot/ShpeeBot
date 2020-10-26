// This will check if the node version you are running is the required
// Node version, if it isn't it will throw the following error to inform
// you.
if (Number(process.version.slice(1).split(".")[0]) < 12)
  throw new Error(
    "Node 12.0.0 or higher is required. Update Node on your system."
  );

// Load up the discord.js library
const Discord = require("discord.js");
// We also load the rest of the things we need in this file:
const { promisify } = require("util");
const { sep } = require("path");
const fs = require("fs");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const DisTube = require("distube");
const config = require("./config.js");

// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`,
// or `bot.something`, this is what we're referring to. Your client.
const client = new Discord.Client({
  ws: {
    intents: config.intents
  }
});

// Here we load the config file that contains our token and our prefix values.
client.config = config;
// client.config.token contains the bot's token
// client.config.prefix contains the message prefix

// Require our logger
client.logger = require("./modules/Logger.js");

// Load the bot status set in the config file
const allowedStatuses = ["online", "idle", "invisible", "dnd"];
// If status is not valid, return error and exit
if (!allowedStatuses.includes(client.config.status)) {
  console.error("Bot status must be either online/idle/invisible/dnd");
  process.exit(1);
}

// Load the bot status type set in the config
const allowedStatusTypes = ["PLAYING", "STREAMING", "LISTENING", "WATCHING"];
// If status is not valid, return error and exit
if (!allowedStatusTypes.includes(client.config.statusType)) {
  console.error(
    "Bot status must be either PLAYING/STREAMING/LISTENING/WATCHING"
  );
  process.exit(1);
}

// Let's start by getting some useful functions that we'll use throughout
// the bot, like logs and elevation features.
require("./modules/functions.js")(client);

// Aliases and commands are put in collections where they can be read from,
// catalogued, listed, etc.
client.commands = new Enmap();
client.aliases = new Enmap();

// Now we integrate the use of Evie's awesome EnMap module, which
// essentially saves a collection to disk. This is great for per-server configs,
// and makes things extremely easy for this purpose.
client.settings = new Enmap({ name: "settings" });

// Load music functions if music commands are enabled
if (client.config.musicEnabled === "true") {
  const distube = new DisTube(client, {
    searchSongs: true,
    emitNewSongOnly: true,
    highWaterMark: 1 << 25
  });
  // Load the music module
  require("./modules/music.js");
}

// We're doing real fancy node 8 async/await stuff here, and to do that
// we need to wrap stuff in an anonymous function. It's annoying but it works.

const init = async () => {
  const dir = "./commands";
  fs.readdirSync(dir).forEach(dirs => {
    const commands = fs
      .readdirSync(`${dir}${sep}${dirs}${sep}`)
      .filter(f => f.endsWith(".js"));

    for (const file of commands) {
      const cmd = require(`./commands/${dirs}/${file}`);
      if (cmd.init) {
        cmd.init(client);
      }
      client.commands.set(cmd.help.name, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });

      // Log each command loaded
      client.logger.log(`[COMMANDS]: Loaded command: ${cmd.help.name}`);
    }
  });

  // Then we load events, which will include our message and ready event.
  const evtFiles = await readdir("./events/");
  client.logger.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    client.logger.log(`Loading Event: ${eventName}`);
    const event = require(`./events/${file}`);
    // Bind the client to any event, before the existing arguments
    // provided by the discord.js event.
    // This line is awesome by the way. Just sayin'.
    client.on(eventName, event.bind(null, client));
  });

  // Generate a cache of client permissions for pretty perm names in commands.
  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }

  // Here we login the client.
  client.login(client.config.token);

  // End top-level async/await function.
};

init();
