var Discord = require('discord.js-selfbot'), data = new Map(), config = require("./Config.json")
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    } 
  }
config.tokens.forEach(token=>{
    var client = new Discord.Client()
    client.login(token).catch(()=>{
        console.log("Bir Tokende Hata bulundu & Geçersiz")
    })

    setInterval(() => {
        var randomChannel = Math.floor(Math.random()*(config.j4jChannels.length-0+0)+0);
        randomChannel = config.j4jChannels[randomChannel]
        var channel = client.channels.cache.find(channel=>channel.id === randomChannel)
        channel.send("j4j dm")
    }, 15000);
    client.on("message",async message=>{
        if(message.channel.type == "dm"){
            if(data.has(`${message.author.id}.j4j`)) return;
            if(message.content.includes("discord.gg")){
                data.set(`${message.author.id}.j4j`,true)
                sleep(1500)
                message.channel.send(config.serverInviteLink)
                message.channel.startTyping()
                sleep(600)
                message.channel.send("Done")
                message.channel.stopTyping()
                client.channels.cache.get(config.j4jLog).send(`${message.author.tag} | ${message.author.id} | ${message.author}\nj4j ile davet edildi`)
            }
        }
    })
})
