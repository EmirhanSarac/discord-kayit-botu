const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const chalk = require("chalk");
const db = require("quick.db")
const ayarlar = require("./ayarlar.json");
var prefix = ayarlar.prefix;

require("./util/eventLoader")(client);

//EMİRHAN SARAÇ

//var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${chalk.yellow(`+`)} ${message}`);
};


//EMİRHAN SARAÇ
client.on('guildMemberAdd', async (member, guild, message) => {

      let kayıtsız = await db.fetch(`isimkayıtsızRol.${member.guild.id}`)
      if (!kayıtsız || kayıtsız.toLowerCase() === 'yok') return;
     else {
      try {
                    member.roles.add(member.guild.roles.cache.get(kayıtsız))
                           } catch (e) {
      console.log(e)
     }
     }
     
     });
/////////////////////////////

//EMİRHAN SARAÇ

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${chalk.red(files.length)} ${chalk.green("komut yüklenecek.")}`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`${chalk.green("Yüklenen komut:")} ${chalk.blue(props.help.name)}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.english = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  //log(`${chalk.red(files.length)} ${chalk.green("komut yüklenecek.")}`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    //log(`${chalk.green("Yüklenen komut:")} ${chalk.blue(props.help.name)}.`);
    client.english.set(props.help.enname, props);
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
//EMİRHAN SARAÇ

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);

      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
//EMİRHAN SARAÇ

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.on('ready', () => {

    // Oynuyor Kısmı
    
        var actvs = [
          `${prefix}yardım ${client.guilds.cache.size} sunucuyu`,
          `${prefix}yardım ${client.users.cache.size} Kullanıcıyı`, 
          `${prefix}yardım`
      ];
      
      client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'LISTENING' });
      setInterval(() => {
          client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'LISTENING'});
      }, 15000);
      
    
        console.log ('_________________________________________');
        console.log (`Kullanıcı İsmi     : ${client.user.username}`);
        console.log (`Sunucular          : ${client.guilds.cache.size}`);
        console.log (`Kullanıcılar       : ${client.users.cache.size}`);
        console.log (`Prefix             : ${ayarlar.prefix}`);
        console.log (`Durum              : Bot Çevrimiçi!`);
        console.log ('_________________________________________');
      
      });
client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
    if (message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("KICK_MEMBERS")) permlvl = 3;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 5;
    if (message.member.hasPermission("MANAGE_ROLES")) permlvl = 4;
      if (message.member.hasPermission("MANAGE_GUILD")) permlvl = 7;
  if (message.author.id === ayarlar.yapımcı) permlvl = 6;
  return permlvl;
};

//EMİRHAN SARAÇ


client.login(ayarlar.token)