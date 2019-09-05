const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission(["KICK_MEMBERS"])) return;

    let memberkick = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!memberkick) return;
        if(memberkick.hasPermission(["KICK_MEMBERS"])) return;

    let reason = args.slice(1).join(" ");
        if(!reason) reason = "Motivo não declarado!";
    
    await memberkick.kick(reason)
        return message.channel.send(`O usuário **${memberkick.user.tag}** foi kickado.`)
    }

module.exports.config = {
    name: "kick",
    aliases: ["kick", "expulsar"]
}