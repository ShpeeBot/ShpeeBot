const { inspect } = require("util");

// This command is to modify/edit guild configuration. Perm Level 3 for admins
// and owners only. Used for changing prefixes and role names and such.

// Note that there's no 'checks' in this basic version - no config 'types' like
// Role, String, Int, etc... It's basic, to be extended with your deft hands!

// Note the **destructuring** here. instead of `args` we have :
// [action, key, ...value]
// This gives us the equivalent of either:
// const action = args[0]; const key = args[1]; const value = args.slice(2);
// OR the same as:
// const [action, key, ...value] = args;
exports.run = async (client, message, [action, key, ...value], level) => {
  // eslint-disable-line no-unused-vars, complexity

  // Retrieve current guild settings
  const settings = client.settings.get(message.guild.id);

  // First, if a user does `-set add <key> <new value>`, let's add it
  if (action === "add") {
    if (!key) return message.reply("Please specify a key to add");
    if (settings[key])
      return message.reply("This key already exists in the settings");
    if (value.length < 1) return message.reply("Please specify a value");

    if (value.length > 1) {
      for (var i = 0; i < value.length; i++) {
        console.log(value[i]);
        value[i] = value[i].replace(",", "");
        console.log(value[i]);
      }
    } else if (value[0].indexOf(",") > -1) {
      value = value[0].split(",");
      //console.log(typeof value);
      //console.log(value);
    } else {
      if (key === "swearWords" || key === "inviteWhitelist") {
        var vArray = [];
        value.indexOf(",") > -1
          ? (vArray = value[0].split(","))
          : vArray.push(value[0]);
        value = vArray;
      } else {
        value = value[0];
      }
      //console.log(typeof value);
      //console.log(value);
    }

    // `value` being an array, we need to join it first.
    settings[key] = value;

    // One the settings is modified, we write it back to the collection
    client.settings.set(message.guild.id, settings);
    message.reply(`${key} successfully added with the value of ${value}`);
  }

  // Secondly, if a user does `-set edit <key> <new value>`, let's change it
  else if (action === "edit") {
    if (!key) return message.reply("Please specify a key to edit");
    if (!settings[key])
      return message.reply("This key does not exist in the settings");
    if (value.length < 1) return message.reply("Please specify a new value");
    //console.log(typeof value);
    //console.log(value);
    //if (typeof value === 'object') {
    //value = value[0].split(',');
    // console.log(value.length);
    if (value.length > 1) {
      for (var i = 0; i < value.length; i++) {
        //eslint-disable-line no-redeclare
        console.log(value[i]);
        value[i] = value[i].replace(",", "");
        console.log(value[i]);
      }
    } else if (value[0].indexOf(",") > -1) {
      value = value[0].split(",");
      //console.log(typeof value);
      //console.log(value);
    } else {
      value = value[0];
      //console.log(typeof value);
      //console.log(value);
    }
    //console.log(value);
    //} else {
    //value = value.join(' ');
    //}
    //console.log(value);

    settings[key] = value;

    client.settings.set(message.guild.id, settings);
    message.reply(`${key} successfully edited to ${value}`);
  }

  // Thirdly, if a user does `-set del <key>`, let's ask the user if they're sure...
  else if (action === "del") {
    if (!key) return message.reply("Please specify a key to delete.");
    if (!settings[key])
      return message.reply("This key does not exist in the settings");

    // Throw the 'are you sure?' text at them.
    const response = await client.awaitReply(
      message,
      `Are you sure you want to permanently delete ${key}? This **CANNOT** be undone.`
    );

    // If they respond with y or yes, continue.
    if (["y", "yes"].includes(response)) {
      // We delete the `key` here.
      delete settings[key];
      client.settings.set(message.guild.id, settings);
      message.reply(`${key} was successfully deleted.`);
    }
    // If they respond with n or no, we inform them that the action has been cancelled.
    else if (["n", "no", "cancel"].includes(response)) {
      message.reply("Action cancelled.");
    }
  } else if (action === "get") {
    if (!key) return message.reply("Please specify a key to view");
    if (!settings[key])
      return message.reply("This key does not exist in the settings");
    message.reply(`The value of ${key} is currently ${settings[key]}`);
  } else {
    message.channel.send(inspect(settings), { code: "json" });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["setting", "settings", "conf"],
  permLevel: "Administrator"
};

exports.help = {
  name: "set",
  category: "System",
  description: "View or change settings for your server.",
  usage:
    "set\nset [get] [key]\n set [edit] [key] [value]\n set [add] [key] [value]\n set [del] [key]"
};
