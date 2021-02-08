const Discord = require('discord.js');
const db = require('quick.db')
exports.run = async(client, message, args) => {
    const ayarlar = require('../ayarlar.json')
    let prefix = await require('quick.db').fetch(`prefix.${message.guild.id}`) || ayarlar.prefix

    if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('Bu komutu kullanmak için **Sunucuyu Yönet** yetkisine sahip olmalısın!')
let kanal = message.mentions.channels.first() 

if(!kanal) {
const hata = new Discord.MessageEmbed()
.setAuthor('HATA', message.author.avatarURL())
.setDescription(`Kanal belirtmeniz gerekiyor! \n\n**Örnek Kullanım:** \n\`\`\`${prefix}isim-kayıt-log #kanaletiket\`\`\``) 
.setColor('RED')
.setTimestamp()
return message.channel.send(hata)
}

db.set(`isimkayıtlog.${message.guild.id}`, kanal.id)
const embed = new Discord.MessageEmbed()
.setAuthor('Başarılı', message.author.avatarURL())
.setDescription(`İsim kayıt log kanalı başarıyla ${kanal} olarak ayarlandı!`)
.setColor('GREEN')
.setTimestamp()
message.channel.send(embed)

}
exports.conf = {
  enabled: true,
  guildOnly: false,  
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'isim-kayıt-log',
  description: '',
  usage: ''
};
