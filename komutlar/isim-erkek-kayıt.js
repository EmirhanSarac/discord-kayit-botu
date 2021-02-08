const Discord = require('discord.js');
const db = require('quick.db')
const ms = require("ms");


exports.run = async(client, message, args) => {
              const ayarlar = require('../ayarlar.json')
				    let prefix = await require('quick.db').fetch(`prefix.${message.guild.id}`) || ayarlar.prefix

  let mutel = await db.fetch(`isimerkekRol.${message.guild.id}`);
  let yetkili = await db.fetch(`isimyetkiliRol.${message.guild.id}`);
  let kayitsiz = await db.fetch(`isimkayıtsızRol.${message.guild.id}`);

  if (!mutel) return
  if(!message.member.roles.cache.has(yetkili)) {
    const hata = new Discord.MessageEmbed()
    .setAuthor('HATA', message.author.avatarURL())
    .setDescription(`Bu komut için yetersiz izniniz bulunuyor! Yetkili rolüne sahip olmalısınız!`) 
    .setColor('RED')
    .setTimestamp()
    return message.channel.send(hata)
      }

    let kisi = message.mentions.members.first()
    if (!kisi) {
      const hata = new Discord.MessageEmbed()
      .setAuthor('HATA', message.author.avatarURL())
      .setDescription(`Lütfen bir kullanıcıyı etiketleyin!\n\n**Örnek Kullanım:** \n\`\`\`${prefix}e @kullanıcı İsim Yaş\`\`\` `) 
      .setColor('RED')
      .setTimestamp()
      return message.channel.send(hata)
        }

    let isim = args[1];
    if(!isim){
      const hata = new Discord.MessageEmbed()
      .setAuthor('HATA', message.author.avatarURL())
      .setDescription(`Bir isim girmelisin. Kullanıcın iki ismi varsa lütfen bir tanesini giriniz!\n\n**Örnek Kullanım:** \n\`\`\`${prefix}e @kullanıcı İsim Yaş\`\`\` `) 
      .setColor('RED')
      .setTimestamp()
      return message.channel.send(hata)
        }
    if(isim.length > 12) {
      const hata = new Discord.MessageEmbed()
      .setAuthor('HATA', message.author.avatarURL())
      .setDescription(`Lütfen doğru bir isim giriniz! Girdiğiniz isim çok uzun!\n\n**Örnek Kullanım:** \n\`\`\`${prefix}e @kullanıcı İsim Yaş\`\`\` `) 
      .setColor('RED')
      .setTimestamp()
      return message.channel.send(hata)
        }
    let yaş = args[2];
    if(!yaş){
      
      const hata = new Discord.MessageEmbed()
      .setAuthor('HATA', message.author.avatarURL())
      .setDescription(`Bir yaş girmelisin!\n\n**Örnek Kullanım:** \n\`\`\`${prefix}e @kullanıcı İsim Yaş\`\`\` `) 
      .setColor('RED')
      .setTimestamp()
      return message.channel.send(hata)
        
  }
    if(yaş.length > 2) {
      const hata = new Discord.MessageEmbed()
      .setAuthor('HATA', message.author.avatarURL())
      .setDescription(`Lütfen doğru bir yaş giriniz! Girdiğiniz yaş çok büyük!\n\n**Örnek Kullanım:** \n\`\`\`${prefix}e @kullanıcı İsim Yaş\`\`\` `) 
      .setColor('RED')
      .setTimestamp()
      return message.channel.send(hata)
        }
    
    if (kisi.id === message.author.id) { 
      const hata = new Discord.MessageEmbed()
      .setAuthor('HATA', message.author.avatarURL())
      .setDescription(`Kendinizi kayıt edemezsiniz!`) 
      .setColor('RED')
      .setTimestamp()
      return message.channel.send(hata)
        }

    let toplam = await db.fetch(`toplamkayıt.${message.guild.id}_${kisi.id}`);

        const embed22 = new Discord.MessageEmbed()
        .setTitle(`Mükemmel!`)
  .setDescription(`**${kisi} Kullanıcısına <@&${mutel}> Rolü Verildi!**
  \`\`\`${isim} ${yaş} Olarak Kayıt Edildin!\`\`\`
  `)
    .setFooter(`Komutu kullanan yetkili : ${message.author.username}`)  
  .setThumbnail(client.user.avatarURL())
  message.channel.send(embed22)
  message.guild.members.cache.get(kisi.id).setNickname(`${isim} ${yaş}`)
    kisi.roles.add(mutel).then(y => y.roles.remove(kayitsiz))
    const number = await db.fetch(`isimkayıtlog.${message.guild.id}`)
    if (number === null) db.set(`isimkayıtlog.${message.guild.id}`, 0)
    db.add(`isimkayıtlog.${message.guild.id}`, 1)
    const num = await db.fetch(`isimkayıtlog.${message.guild.id}`)
    
    db.set(`isiiimkayıt.${message.guild.id}.${num}`, {
      moderator: `${message.author.tag}`,
      action: 'Register3',
      user: `(${kisi.id}) ${kisi.tag}`
    }) 

    const yar = new Discord.MessageEmbed()
    .setTitle(`İsim Kayıt Log - #${num}`)
.setDescription(`
**Kayıt Edilen Kullanıcı:** ${kisi}
**Kullanıcıyı Kayıt Eden Kullanıcı**:  <@!${message.author.id}>
`)
.setTimestamp()
.setThumbnail(client.user.avatarURL())
 
   let channel = db.fetch(`isimkayıtlog.${message.guild.id}`)
   if (!channel) return;
   else if (channel === "none") return;
   let log = message.guild.channels.cache.get(channel)
   
   return log.send({embed: yar}) 


  db.add(`erkekpuan_${message.guild.id}_${message.author.id}`, 1);
  db.add(`toplamkayıt.${message.guild.id}_${message.author.id}`, 1);
  db.push(`isimler1.${message.guild.id}_${kisi.id}`, isim)
  db.push(`isimler2.${message.guild.id}_${kisi.id}`, yaş)

};



exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['isim-erkek'],
  permLevel: 0
};

exports.help = {
  name: 'e',
  description: 'Erkek rolü verirsiniz.',
  usage: 'erkek',
};