const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {

    let coloruser = args[0];
        if(!coloruser) return message.channel.send("Por favor escolha uma cor no padrão hexadecimal (ex: !color #0f0f0f)");

    let colorrole = message.guild.roles.find(role => role.name === message.author.tag);
        if(!colorrole){
            try {
                colorrole = await message.guild.createRole({
                    name: message.author.tag,
                    color: `${coloruser}`,
                    permissions: []
                })
            } catch(e) {
                console.log(e.stack);
            }
        }
    
    message.member.addRole(colorrole.id);
}

module.exports.config = {
    name: "color",
    aliases: ["color", "colorrole"]
}