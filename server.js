// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const discord = require("discord.js");
var intercoms = require("./intercom.json")
const fs = require('fs');
const path = require('path');
const http = require('http')
var inmsgs = require("./intercom_messages.json")
const Decimal = require("./break_eternity.js")
var stonks = require("./stonks.json")
function save() {
  fs.writeFileSync(path.resolve(__dirname, "./intercom.json"), JSON.stringify(intercoms, null, "\t"))
  
}
var stonkPrice = stonks.price;
function save2(){fs.writeFileSync(path.resolve(__dirname, "./intercom_messages.json"), JSON.stringify(inmsgs, null, "\t"))}
function save3(){fs.writeFileSync(path.resolve(__dirname, "./stonks.json"), JSON.stringify(stonks, null, "\t"))}
//setInterval(()=>{this.location.href="http://rulebook-bot.glitch.me/"})
// embed function
/***
embed({
title: "title",
description: "description",
color: "color"
})
***/
const embed = (params) => {
  return new discord.MessageEmbed().setTitle(params.title).setDescription(params.description).setColor(params.color)
}
// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];//what is this for
let data = {
  reacters: []
}
function help(args,msg) {
  let embed = {
      title: "Help Page",
      description: "These are all of the explanations for each category! Type r!help [category] to get the commands for each category. All of them do something different.",
      color: "00ff00",
      fields: [
      {
        name: ":white_check_mark: Basic",
        value: "You can get more info about this bot by doing r!info.\nYou can test to see if the bot is running by saying 'Ping!'.\nYou can do r!invite to get the invite link for the bot and the invite link to the Discord server."
      },
      {
        inline: true,
        name: ":loudspeaker: Intercom",
        value: "Allows you to communicate with other servers, with multiple channels!",
      },
      {
        inline: true,
        name: ":arrow_upper_right: Polls",
        value: "Allows you to create polls! You can add custom options and add time limits (TBD)!",
      },
        {
        inline: true,
        name: ":hammer: Moderation",
        value: "Allows you to moderate your server with easy-to-use commands without right-clicking once!",
      },
        {
        inline: true,
        name: ":video_game: Games",
        value: "Allows you to play fun games using the bot!",
      },
        {
        inline: true,
        name: ":smile: Fun",
        value: "Fun commands to discover!",
      },{
        inline: true,
        name: ":star: Starboard",
        value: "Activating it allows for messages with enough star reactions to get posted within a starboard channel!",
      },
    ]
    } // let's just make i have no idea
    if (args[0]=="intercom"){
      embed = {
      title: "Help Page - Intercom",
      description: "These are all of the commands for intercom.",
      color: "ff0000",
      fields: [
        {
          inline: true,
          name: "r!intercom add",
          value: "This allows you to add the channel for talking with other people in other servers (intercom).",
        },
        {
          inline: true,
          name: "r!intercom remove",
          value: "This allows you to remove your channel from the intercom.",
        },
        {
          inline: true,
          name: "r!join <id>",
          value: "At the bottom of each post you see a Server ID. Use this to visit the other servers!"
        }
      ]
      }
    }
    if (args[0]=="polls"){
        embed = {
        title: "Help Page - Polls",
        description: "These are all of the commands for polls.",
        color: "ffff00",
        fields: [
        {
          inline: true,
          name: "r!poll <question>, <option 1>, <option 2>, ... <option x>",
          value: "This command creates an embed with reactions depending on the number of options you put after the question.",
        },
        ]
        }
    }
    if (args[0]=="moderation"||"mod") {
        embed = {
        title: "Help Page - Moderation",
        description: "These are all of the commands for moderation.",
        color: "0000ff",
        fields: [
        {
          inline: true,
          name: "r!warn <user> <reason>",
          value: "This command warns the user by DMing a warning message to them.",
        },
        {
          inline: true,
          name: "r!kick <user> <reason>",
          value: "This command kicks the user, and DMs a kick message to them.",
        },
        {
          inline: true,
          name: "r!softban <user> <reason> OR r!hardkick <user> <reason>",
          value: "This command kicks the user and deletes their message history up to 24 hours ago, and DMs a softban message to them.",
        },
        {
          inline: true,
          name: "r!ban <user> <reason>",
          value: "This command bans the user, and DMs a ban message to them.",
        },
        ]
        }
    }
    if (args[0]=="games") {
      embed = {
        title: "Help Page - Games",
        description: "These are all of the commands for games.",
        color: "ff00ff",
        fields: [
        {
          inline: true,
          name: "Not implemented yet",
          value: "There are no games...yet. We have been working on other things, we'll get some games ready soon.",
        },
        ]
        }
    }
    if (args[0]=="fun") {
      embed = {
        title: "Help Page - Fun",
        description: "These are all of the commands for fun.",
        color: "9acd32",
        fields: [
        {
          inline: true,
          name: "r!say <text>",
          value: "This command says what you say, and deletes your message. Seems like the bot is talking! Spoopy.",
        },
        {
          inline: true,
          name: "r!echo <text>",
          value: "This command says what you say.",
        },
        {
          inline: true,
          name: "r!not <text>",
          value: "This command turns your word into the opposite (yes becomes yesn't, no becomes non't, do becomes don't, etc.).",
        },
        {
          inline: true,
          name: "r!randomize <input 1> <input 2> ... <input x>",
          value: "This command picks a random input from 1 to x within the command. You can play Russian Roulette with this (Note: My friend is so good at Russian Roulette, he only lost once!).",
        },
        ]
        }
    }
    if (args[0]=="starboard"||"star") {
      embed = {
        title: "Help Page - Starboard",
        description: "These are all of the commands for starboard.",
        color: "ff8000",
        fields: [
        {
          inline: true,
          name: "Not implemented yet",
          value: "Starboard has not been implemented...yet. We have been working on other things, we'll get starboard ready soon.",
        },
        ]
        }
    }
    msg.channel.send({embed})
} 
const client = new discord.Client({
  partials: ["MESSAGE","CHANNEL","USER","REACTION"]
})
client.login(process.env.TOKEN)
// 1088: discord games hub 2650: prestige game 7999: removing all softcaps 1741: mkey's private server 8520: 1mz ng- 3482: rulebook bot server
//const incoms = ["711681321684041741","791444101789777999","792815514287472650","792821663338201088","793184763548008520","793528707868393482"]
//let owoCheck = /[õoôöòóuüúûùø](w|vv|ω|ww|www|vw|wv)[õoôöòóuüúûùø]/ // hm ill figure that one out ig
let intercomColors = ["ff0000","ff8000","ffff00","00ff00","00ffff","0000ff","ff00ff","ffffff","000000","800080"]
let mods = ["428921414914146304","350057688182292482","465358166675423233","712738568442871849"]
let badWords = ["nigg","cunt","whore","fuck","shit","bitch"," ass ","crap"]//to detect only the word and not things that contain it, put spaces around it
client.on("message", msg => {//<:pins:804442022396035192>
  if (msg.channel.type!="dm"){if (msg.guild.id=="803392589490814997"&&msg.content.startsWith("<:pins:804442022396035192>")){msg.pin()}}
  if (msg.author.bot) return
  if (msg.channel.type == "dm" && (msg.content=="Thonkeres" || msg.content=="thonkeres")) client.guilds.cache.get("795114069924773958").fetchMember(msg.author.id.toString()).then(mem => mem.roles.add(client.guilds.cache.get("795114069924773958").roles.cache.find(m => m.name==="Stage One")))
  let hasBadWord = false
    for (let h in badWords){
      if (msg.content.includes(badWords[h])) hasBadWord=true
    }
  if (msg.channel.type != "dm"&&msg.guild.id=="776280438595387393"&&(hasBadWord)){msg.guild.channels.cache.get("798241273072582686").send("1 Strike to <@"+msg.author.id+"> for swearing in <#"+msg.channel.id+">")}
  if(msg.channel.type != "dm" && intercoms.incoms.includes(msg.channel.id) && !msg.author.bot && !msg.content.startsWith("r!")) {
    if (msg.content.length==1){msg.channel.send("<@"+msg.author.id+'>, Please send actual messages in intercom, not just stuff like "k".');return}

    let e = ""
    if (mods.includes(msg.author.id)) e = " (Mod)"
    inmsgs[msg.id]=[]
    if (!hasBadWord){// if it does, it just pings and says "no bad words"
      let image = msg.attachments.first()
      let r = { // we dont want conflicts
      title: msg.guild.name+" - #"+msg.channel.name, // it doesnt work bc im not in the server
      description: msg.content,
      color: intercomColors[msg.guild.id[msg.guild.id.length-1]], // thonkeres i mean idk
      author: {
        name: msg.author.username+e,
        icon_url: msg.author.displayAvatarURL(),
        url: "http://example.com"
      },
      footer: {
        text: "User ID: "+msg.author.id+" • Server ID: "+msg.guild.id
      },
      timestamp: Date.now()
      }
    if (image !== undefined){
        image = image.url
        r = { // we dont want conflicts
      title: msg.guild.name+"-#"+msg.channel.name, // it doesnt work bc im not in the server
      description: msg.content,
      color: intercomColors[msg.guild.id[msg.guild.id.length-1]],
      author: {
        name: msg.author.username+e,
        icon_url: msg.author.displayAvatarURL() 
      },
      image: {// this breaks all non-image messages
        url:  image
      },
      footer: {
        text: "User ID: "+msg.author.id+" • Server ID: "+msg.guild.id
      },
      timestamp: Date.now()
      }
      }
      let embeded = r
    // no were sending an embed object
    for (let i in intercoms.incoms){
      if (intercoms.incoms[i]!=msg.channel.id){
      //console.log(intercoms.incoms[i])
      client.channels.cache.get(intercoms.incoms[i].toString()).send({embed: embeded}).then(message=>{inmsgs[msg.id].push(message.id)})
      }
    }
    save2()
    } else {
      msg.channel.send("no bad words <@"+msg.author.id+">")
    }
  }
  if(msg.content=="Ping!") msg.channel.send(embed({
    title: "Pong!",
    description: "The bot is running correctly",
    color: "#FF0000"
  }))
  // Say command
  // Command calling
  if(!msg.content.startsWith("r!")) return
  let args = msg.content.substring(2).split(" ")// what perms does it have oh *makes new bot with admin perms* ok I'll try
  const command = args[0] // the bot doesnt have the perms sorry
  args.shift()// manage messages, view channels, send messages, send tts messages i think uh you gotta readd old rule 2 to do that k poggeres
  if(commands.hasOwnProperty(command)) commands[command](args,msg)
})
/*client.on("messageDelete", msg => {
  if(!msg.content.includes('r!emojify')&&msg.guild.id=="790331530357899296"&&!msg.content.includes("z/suggest"))// it should check for content so it doesnt show r!emojify
    client.channels.cache.get("790596148162592768").send(embed({
      title: "MESSAGE DELETED",
      description: msg.author.username+" sent "+msg.content+" and deleted it!",
      color: "#FF0000"
    }))
})*/
client.on('messageReactionAdd', async (thinkeres, thinkeros) => {
  
  const reaction = await thinkeres.fetch()
  const user = await thinkeros.fetch()
  const msg = reaction.message
  console.log(reaction.message.channel.id==793870294552543242, intercoms.moderators.includes(user.id))
  if (reaction.message.channel.id==793870294552543242&&intercoms.moderators.includes(user.id)){
  for (let m in intercoms.incoms){
  client.channels.cache.get(intercoms.incoms[m]).messages.fetch(inmsgs[m]).then(message => {
  message.delete() 
  }).catch(console.error)
}
  }
  // crap we gotta find the corresponding message in EVERY SERVER
})// allowing mods to delete intercom messages

/*client.on('messageReactionAdd', (reaction, user) => {
  console.log("Running")
  if (!reaction.message.id==790980190447730729) return
 // if (data.reacters.includes(user.id)) return
  reaction.message.channel.send("collected")
});*/
// Commands

const commands = { // actually just hook it up to ooo secret intercom channel :flushed: yknow what imma do this myself
  async join(args,msg) {
    let server = args[0]
    const channel = client.guilds.cache.get(server).channels.cache.filter(c => c.type === 'text').find(x => x.position == 0)
    await channel.createInvite({ unique: true, temporary: false }).then(invite => {client.users.cache.get(msg.author.id).send("https://discord.gg/"+invite.code)})
  },
  kick(args,msg) {
    if(!msg.member.hasPermission(2)) {
      msg.channel.send("You need kick member permissions to use this command.")
      return
    }
    if (msg.mentions.members.first()==msg.member){msg.channel.send("You can't kick yourself!");return}
    msg.mentions.members.first().send(embed({title: "Press X to Shame", description: "You were kicked from "+msg.guild.name+" for: "+args.slice(1).join(" "),color:"ff8000"}))
    msg.mentions.members.first().kick().catch()
  },
  ban(args,msg) {
    if(!msg.member.hasPermission(4)) {
      msg.channel.send("You need ban member permissions to use this command.")
      return
    }
    if (msg.mentions.members.first()==msg.member){msg.channel.send("You can't ban yourself!");return}
    msg.mentions.members.first().send(embed({title: "Kids like you should be... burning in hell.", description: "You were banned from "+msg.guild.name+" for: "+args.slice(1).join(" "),color:"800000"}))
    msg.mentions.members.first().ban().catch()
  },
  unban(args,msg){
    msg.guild.members.unban(args[0]).catch()
    msg.mentions.members.first().send(embed({title: "Woo, you're back!", description: "You were unbanned from "+msg.guild.name,color:"00ff00"}))
  },
  softban(args,msg){//kick and manage messages
    if(!msg.member.hasPermission(2) || !msg.member.hasPermission(8192)) {
      msg.channel.send("You need kick and manage message permissions to use this command.")
      return
    }
    if (msg.mentions.members.first()==msg.member){msg.channel.send("You can't softban yourself!");return}
    msg.mentions.members.first().send(embed({title: "This server ain't big enough for the two of us.", description: "You were softbanned from "+msg.guild.name+" for: "+args.slice(1).join(" "),color:"eb6434"}))
    msg.mentions.members.first().ban({days: 1}).catch()
    msg.guild.members.unban(msg.mentions.users.first().id).catch()
  }, // deletes 24h of messages i hope lmaok test
  hardkick: this.softban,
  warn(args,msg) {
    if(!msg.member.hasPermission(8192)&&!msg.member.hasPermission(4194304)&&!msg.member.hasPermission(2)&&!msg.member.hasPermission(4)) {
      msg.channel.send("You don't have the permissions to use this command.")
      return
    }
    msg.mentions.members.first().send(embed({title: "Warning", description: "You were warned in "+msg.guild.name+" for: "+args.slice(1).join(" "),color:"ffff00"}))
    
  },
  remind(args,msg){
    
    let reminder = args.slice(1).join(" ")
    function f(){msg.channel.send(reminder)}
    let time = args[0]
    let sec
    if (time.endsWith("m")){sec=new Decimal(args[0].slice(0,-1)).times(60000)}
    else if (time.endsWith("h")){sec=new Decimal(args[0].slice(0,-1)).times(3.6e6)}
    else if (time.endsWith("d")){sec=new Decimal(args[0].slice(0,-1)).times(86400000)}
    else if (time.endsWith("s")) {sec=new Decimal(args[0].slice(0,-1))}
    else {sec=new Decimal(args[0])}
    setTimeout(f,sec.mag)
  },
  poll(args,msg) { //important
    let c = args.join(" ").split(",")
    let title = c[0]
    let options = c.slice(1)
    let length = options.length
    if (options.length>10){msg.channel.send("Too many options!");return;}
    let letters = ["🇦","🇧","🇨","🇩","🇪","🇫","🇬","🇭","🇮","🇯"]
    let poll = embed({"title":title,"description":options.join(","),color:"FFFF00"})
    msg.channel.send(poll).then(msg=> {
      for (let i in options){
      msg.react(letters[i]) }
    })
    
  },
  eval:(args,msg)=>{ //testing
    if (msg.author.id!="428921414914146304"&&msg.author.id!="763169046199664640"&&msg.author.id!="350057688182292482"){return}
    msg.channel.send(eval(args.join(" ")))
  },
  updateStonk:(args,msg)=>{
    let price = stonkPrice
      price = price*Math.pow(10,Math.min(Math.max(Math.tan(Math.random()*1000000),0.001),1000))
    stonkPrice= price
msg.channel.send("```Stonk asdfghjkl: Cost "+stonkPrice+"```")
    save3()
  },
  invite:(args,msg)=>{
    msg.channel.send("Invite me! https://discord.com/api/oauth2/authorize?client_id=790583998421794817&permissions=8&scope=bot\nOfficial server: https://discord.gg/dnTnUs3RJc")
  },
  thonkeres(args,msg){msg.channel.send("thonkeres")},
  intercom:(args,msg)=>{ //important
    if(!msg.member.hasPermission(32)) {
      msg.channel.send("You need manage server permissions to use this command.")
      return
    }
    if (args[0]=="add"){
      if (intercoms.incoms.includes(msg.channel.id)){msg.channel.send("You already added this intercom!");return}
      intercoms.incoms.push(msg.channel.id)
      msg.channel.send("Intercom successfully added!")
      save()
    }
    else if (args[0]=="remove"){
      intercoms.incoms=intercoms.incoms.filter(i=>i!=msg.channel.id)
      msg.channel.send("Intercom successfully removed!")
      save()
    }
  },
  pinger: (args,msg)=>{ //important
    msg.channel.send("pinger "+args.join(" "))
  },
  not: (args,msg)=>{ //fun
    let thign = args.join(" ")
    let sign = ((thign.endsWith("a") || thign.endsWith("e") || thign.endsWith("i") || thign.endsWith("u") || thign.endsWith("n")) ? thign.slice(0, -1) : thign);
    msg.channel.send(sign + "n't");
  },
  say: (args,msg)=>{ //fun
      msg.channel.send(args.join(" "));
      msg.delete(2);
  },
  randomize: (args,msg)=>{ //fun
    msg.channel.send(args[Math.floor(Math.random()*args.length)])
  },
  help,
  info: (args,msg)=>{ //important
    msg.channel.send({
      embed: {
        title: "Bot Info",
        description: "Pretty much an FAQ about this bot",
        fields: [
          {
            name: "Who made this bot?",
            value:
              "Most of the code for Rulebook Bot was made by TheMKeyHolder and MEME. randomtuba helped as well, but not as much because he's lazy."
          },
          {
            name: "Why is this bot called Rulebook Bot?",
            value:
              "There was a server called 'The Rulebook' which got deleted, and the bot was created within that server."
          },
          {
            name: "What does this bot do?",
            value:
              "This bot can be used for intercom, moderation, polls, and more! You can also play some fun games with it."
          }
        ] // you copy the stuff gtg
        // description: "**Who made this bot?**\nMost of the code for Rulebook Bot was made by TheMKeyHolder and MEME. randomtuba helped as well, but not as much because he's lazy.\n\n**Why is this bot called Rulebook Bot?**\nThere was a server called 'The Rulebook' which got deleted, and the bot was created within that server.\n\n**What does this bot do?**\nThis bot can be used for intercom, moderation, polls, and more! You can also play some fun games with it."}
      }
    });
  }, // move to the help function above we  wann
  embed: (args,msg)=>{ //testing
    msg.channel.send({embed: JSON.parse(args.join(" "))})
  },
  echo: (args,msg)=>{ //fun
    msg.channel.send(msg.content.slice(7).replace("@","").replace("<!712738568442871849>","<@!712738568442871849>"))
    if(msg.content.includes('r!emojify')){msg.delete()}
  },
}


// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});
// 790958794616209428
// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
