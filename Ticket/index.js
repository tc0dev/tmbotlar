const {PermissionsBitField, EmbedBuilder, ButtonStyle, Client, GatewayIntentBits, ChannelType, Partials, ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType, SelectMenuInteraction, ButtonBuilder } = require("discord.js");
const config = require("./config.js");
const { joinVoiceChannel } = require('@discordjs/voice');
const Discord = require("discord.js")
const db = require("croxydb")
const client = new Client({
  partials: [
    Partials.Message,
    Partials.Channel, 
    Partials.GuildMember, 
    Partials.Reaction, 
    Partials.GuildScheduledEvent, 
    Partials.User, 
    Partials.ThreadMember, 
  ],
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMembers, 
    GatewayIntentBits.GuildBans, 
    GatewayIntentBits.GuildEmojisAndStickers, 
    GatewayIntentBits.GuildIntegrations, 
    GatewayIntentBits.GuildWebhooks, 
    GatewayIntentBits.GuildInvites, 
    GatewayIntentBits.GuildVoiceStates, 
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping, 
    GatewayIntentBits.DirectMessages, 
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping, 
    GatewayIntentBits.MessageContent, 
  ],
});

module.exports = client;


client.login(config.token || process.env.TOKEN)

client.on("ready", async() => {
  console.log("Bot aktif!")
  const Discord = require("discord.js")
const channel = config.channel
const as = client.channels.cache.get(channel)
const embed = new EmbedBuilder()
.setColor("127896")
.setAuthor({ name: `AstraV | Destek Sistemi`, iconURL: as.guild.iconURL({ dynamic: true }) })
.setDescription("Sunucumuzda destek oluşturabilmek için aşağıdaki butona basıp bir kategori seçmeniz gerekiyor.")
.addFields(
     { name: '\u200B', value: '\u200B' },
     { name: "🔸 Oyundışı Destek ", value: "Oyundışı'ndan Destek Talep Edersin", inline: true },
     { name: "🔹 Oyuniçi Destek ", value: "Oyuniçi'nden Destek Talep Edersin.", inline: true },
     { name: "⛔ Kullanıcı Bildirimi ", value: "Bir kullanıcıyı bildirirsin.", inline: true },
 )
 .setThumbnail("https://cdn.discordapp.com/attachments/1243250479971172533/1244059044860264570/Paragraf_metniniz_4.png?ex=6653bbc5&is=66526a45&hm=f03e331d0a62a2f78cd87e7e5cdef04d81ff39a12a903b30be51685c0af2c444&")
 .setImage("https://cdn.discordapp.com/attachments/1243250479971172533/1244059044583313519/Paragraf_metniniz_7.png?ex=6653bbc5&is=66526a45&hm=747920a14886c32299fb9c624d437cecd04698582cff481f926f2559eb8bced8&")
 .setFooter({ text: "⛔ by BiavenX Devleopment", iconURL: "https://cdn.discordapp.com/attachments/1238433738728276029/1238480532564742265/l..t.h.gif?ex=663f7060&is=663e1ee0&hm=7b6194252d9832425e91820767a48900532ea01501934e142ce57b433cb5348c&" })

const row = new Discord.ActionRowBuilder()
.addComponents(
new Discord.ButtonBuilder()
.setLabel("Destek Talebi Oluştur")
.setStyle(Discord.ButtonStyle.Secondary)
.setCustomId("destek")
.setEmoji("🎫")
)
as.send({embeds: [embed], components:[row]})
})
client.on("interactionCreate", async(interaction) => {
if(interaction.customId === "destek") {
  const row = new Discord.ActionRowBuilder()
  .addComponents(
    new Discord.ButtonBuilder()
    .setEmoji("🔸")
    .setStyle(Discord.ButtonStyle.Success)
    .setCustomId("Oyundışı Destek"), 
    new Discord.ButtonBuilder()
    .setEmoji("🔹")
    .setStyle(Discord.ButtonStyle.Primary)
    .setCustomId("Oyuniçi Destek"),
    new Discord.ButtonBuilder()
    .setEmoji("⛔")
    .setStyle(Discord.ButtonStyle.Danger)
    .setCustomId("Kullanıcı Bildirimi"),

  )
  const embed = new EmbedBuilder()
  .setDescription("Hangi kategoriyi seçmek istiyorsun?")
  .setColor("127896")
interaction.reply({embeds: [embed], components: [row], ephemeral: true}).catch(error => {})


}

const butonlar = ["Oyundışı Destek","Oyuniçi Destek","Kullanıcı Bildirimi"]
if(butonlar.includes(interaction.customId)) {
  await interaction.deferUpdate()
  const data = db.get(`ticket_${interaction.guild.id}`) || "1"
  interaction.guild.channels.create({
             name: `ticket-${data}`,
               type: ChannelType.GuildText,

               permissionOverwrites: [
                 {
                     id: interaction.guild.id,
                     deny: [PermissionsBitField.Flags.ViewChannel]
                 },
                 {
                     id: interaction.user.id,
                     allow: [PermissionsBitField.Flags.ViewChannel]
                 },
                 {
                     id: config.staff,
                     allow: [PermissionsBitField.Flags.ViewChannel]
                 },
             ]
           })


                 .then((c)=>{

const embed = new EmbedBuilder()
.setAuthor({name: "AstraV - Destek Sistemi!", iconURL: interaction.guild.iconURL()})
.setDescription("Hey, destek talebi açtığına göre önemli bir konu olmalı.Bu sürede birini etiketleme ve sakince sorununu belirt. ||<@&1244188477298573383>||")
.addFields(
  { name: '\u200B', value: '\u200B' },
  {name: "Kullanıcı:", value: `${interaction.user.tag}`, inline: true},
  {name: "Sebep:", value: `${interaction.customId}`, inline: true},
  {name: "Destek Sırası:", value: `${data}`, inline: true}
)
.setColor("127896")
const row = new ActionRowBuilder()
.addComponents(
  new Discord.ButtonBuilder()
  .setEmoji("📑")
  .setLabel("Kaydet Ve Kapat")
  .setStyle(Discord.ButtonStyle.Secondary)
  .setCustomId("kapat"),
  new Discord.ButtonBuilder()
  .setEmoji("<:bilgi:1026204345060036691>")
  .setLabel("Mesajlar")
  .setStyle(Discord.ButtonStyle.Secondary)
  .setCustomId("mesaj")
)
db.set(`kapat_${c.id}`, interaction.user.id)
db.add(`ticket_${interaction.guild.id}`, +1)
c.send({embeds: [embed], components: [row]}).then(a => {
a.pin()

                 })
               })
}
})

client.on("messageCreate", async(message) => {
if(message.channel.name.includes("ticket")) {
  if(message.author?.bot) return;
db.push(`mesaj_${message.channel.id}`, `${message.author.username}: ${message.content}`)
}
})
client.on("interactionCreate", async(message) => {
if(message.customId === "mesaj") {
  const fs = require("fs")
  const wait = require('node:timers/promises').setTimeout;
const datas = db.fetch(`mesaj_${message.channel.id}`)
if(!datas) {
  fs.writeFileSync(`${message.channel.id}.json`, "Bu kanalda hic bir mesaj bulunamadi!");
  message.reply({files: [`./${message.channel.id}.json`]}).catch(error => {})
}
if(datas) {
const data = db.fetch(`mesaj_${message.channel.id}`).join("\n")
fs.writeFileSync(`${message.channel.id}.json`, data);
message.reply({files: [`./${message.channel.id}.json`]}).catch(error => {})
}
}
})

process.on("unhandledRejection", async(error) => {
console.log("Bir hata olustu: "+error)

})
client.on("interactionCreate", async(interaction) => {
if(interaction.customId === "kapat") {
  const id = db.fetch(`kapat_${interaction.channel.id}`)
  const channel = interaction.channel
 channel.permissionOverwrites.edit(id, { ViewChannel: false });

                   const embed = new EmbedBuilder()
                   .setDescription("Bu destek talebi sonlandırıldı, umarım sorun çözülmüştür :)")
                   .setColor("127896")
                   await interaction.reply({embeds: [embed]})
}
})

client.on('ready', () => { 
  joinVoiceChannel({
  channelId: '1244188954111246407',
  guildId: "1231944828921843814",       
  adapterCreator: client.guilds.cache.get("1231944828921843814").voiceAdapterCreator
      });
  });



