const Discord = require('discord.js');
const db = require('quick.db')
exports.run = async(client, message, args) => {
    const ayarlar = require('../ayarlar.json')
    let prefix = await require('quick.db').fetch(`prefix.${message.guild.id}`) || ayarlar.prefix

    const embed = new Discord.MessageEmbed()
    .setAuthor(`Sunucu Kayıt Sistemi`, message.author.avatarURL())
    .setDescription(`:white_small_square: - \`${prefix}isim-erkek-role [@roletiket]\` - \`${prefix}isim-erkek-role-kapat\` 
Sunucuda kayıt edebilmeniz için erkek rolü belirlemelisiniz.

    :white_small_square: - \`${prefix}isim-kadın-role [@roletiket]\` -  \`${prefix}isim-kadın-role-kapat\` 
    Sunucuda kayıt edebilmeniz için kadın rolü belirlemelisiniz.

    :white_small_square: - \`${prefix}isim-yetkili-role [@roletiket]\` -  \`${prefix}isim-yetkili-role-kapat\` 
Kullanıcıları kayıt edebilecek bir yetkili rolü belirtmelisiniz.

:white_small_square: - \`${prefix}isim-kayıtsız-role [@roletiket]\` -  \`${prefix}isim-kayıtsız-role-kapat\` 
Sunucuya katılınca verilecek kayıtsız rolünü ayarlamanız gerekmektedir.

:white_small_square: - \`${prefix}isim-kayıt-log [#kanaletiket]\` -  \`${prefix}isim-kayıt-log-kapat\` 
Kayıt edilen kullanıcıları log kanalına yansıtacak bir kanal seçersiniz.

:white_small_square: - \`${prefix}isimler [@kullanıcı]\`
Kullanıcı eskiden kayıt yaptırdıysa bu komutla eski isimlerine bakabilirsiniz [Güvenlik Amaçlı].

:white_small_square: - \`${prefix}admin-istatistik [@kullanıcı]\`
Bu komutla yetkililerin kaç erkek, kaç kadın kullanıcı kaydettiğini görürsünüz.


\`\`\`Sıfırlama Komutları\`\`\`
:white_small_square: - \`${prefix}isim-kayıt-kapat\` 
Bu komutla tüm sistemler kapanır.

\`\`\`Nasıl Kullanılır?\`\`\`
**Erkek komut Kullanımı: \`${prefix}isim-erkek, ${prefix}e\`** 
**Kadın komut Kullanımı: \`${prefix}isim-kadın, ${prefix}k\`**

:white_small_square: - **Örnek Erkek komut kullanım:** \`${prefix}isim-erkek @etiket İsim Yaş\`
:white_small_square: - **Örnek Kadın komut kullanım:** \`${prefix}isim-kadın @etiket İsim Yaş\`
  
`)
.setFooter(`${message.author.tag} Tarafından istendi!`,  message.author.avatarURL())
.setThumbnail(message.author.avatarURL())
.setColor('#F3EF0B')
    .setTimestamp()
    return message.channel.send(embed)
}
exports.conf = {
  enabled: true,
  guildOnly: false,  
  aliases: ['isimlikayıt','isimlikayıtsistemi','isimkayıtsistem','isim-kayıt-sistem'],
  permLevel: 0
};

exports.help = {
  name: 'isimli-kayıt-sistemi',
  description: 'Tek komut da isimli (Erkek - Kadın) kayıt sistem',
  usage: 'isimli-kayıt-sistemi',
  type:'Moderasyon'
};
