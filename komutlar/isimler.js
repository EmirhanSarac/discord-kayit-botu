const Discord = require('discord.js'); 
const db = require('quick.db'); 

exports.run = async (client, message, args, params) => { 
	var user = message.mentions.users.first() || message.client.users.cache.get(args[0]) || message.client.users.cache.find(m => m.username === args.slice(0).join(" "))
    const member = message.guild.member(user)
let kisi = client.users.cache.get(member.id);
let filtre = await db.fetch(`isimler1.${message.guild.id}_${kisi.id}`)
let filtre2 = await db.fetch(`isimler2.${message.guild.id}_${kisi.id}`)
let yetkili = await db.fetch(`isimyetkiliRol.${message.guild.id}`);
if(!message.member.roles.cache.has(yetkili)) {
  const hata = new Discord.MessageEmbed()
  .setAuthor('HATA', message.author.avatarURL())
  .setDescription(`Bu komut için yetersiz izniniz bulunuyor! Yetkili rolüne sahip olmalısınız!`) 
  .setColor('RED')
  .setTimestamp()
  return message.channel.send(hata)
    }
if(!user)  {
  const hata = new Discord.MessageEmbed()
  .setAuthor('HATA', message.author.avatarURL())
  .setDescription(`Lütfen bir kullanıcıyı etiketleyin!\n\n**Örnek Kullanım:** \n\`\`\`${prefix}isimler @kullanıcı\`\`\` `) 
  .setColor('RED')
  .setTimestamp()
  return message.channel.send(hata)
    }
if(db.fetch(`isimler1.${message.guild.id}_${kisi.id}`) === undefined || db.fetch(`isimler1.${message.guild.id}_${kisi.id}`).length <= 0) { 
    var embed = new Discord.MessageEmbed()
                  .setColor('RED')
    .setThumbnail(message.guild.iconURL)
.setAuthor(kisi.tag, kisi.avatarURL())
.addField(`İsimler`, `Bulunmuyor!`)
    return message.channel.send(embed)
  } else {


    var embed = new Discord.MessageEmbed()
                  .setColor('#D2EE07')
    .setThumbnail(message.guild.iconURL)
.setAuthor(kisi.tag, kisi.avatarURL())
    .addField(`Kaydedilen İsimler`,filtre) 
   .addField(`Kaydedilen Yaşlar`, filtre2) 
   .setFooter(`Eskiden Kaydedilmiş İsim ve Yaş Listesi`)
    .setTimestamp() 
    return message.channel.send(embed)
  
}

};

exports.conf = { 
  enabled: true, 
  guildOnly: false, 
  aliases: [], 
  permLevel: 0,
  kategori: "moderasyon",
 
}; 

exports.help = { 
  name: 'isimler', 
  description: '', 
  usage: 'isimler',
  
};