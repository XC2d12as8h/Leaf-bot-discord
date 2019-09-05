const Discord = require('discord.js');
const config = require('./config.json');
const pjson = require('./package.json');
const fs = require('fs');

const client = new Discord.Client();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

    fs.readdir("./commands/", (err, files) => {
        if(err) console.log(err)

        let jsfile = files.filter(f => f.split(".").pop() === "js")
        console.log(`Carregando o total de ${jsfile.length} comandos.`)
    if(jsfile.length < 0) {
        console.log("Não consegui achar comandos!")
    }

    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        client.commands.set(pull.config.name, pull);
            pull.config.aliases.forEach(alias => {
                client.aliases.set(alias, pull.config.name)
            });
    });
});

client.on("ready", () => {
    let countserver = null;
        if (client.guilds.size = 1) {
            countserver = "servidor"
        } else {
            countserver = "servidores"
        }
    console.log(`------------leaf bot discord-----------------\n
    Olá, estou online em ${client.guilds.size} ${countserver}!`);

    client.user.setActivity(`Leaf Bot v ${pjson.version}`);
});

client.on("message", async message => {
    
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(message.content.indexOf(config.prefix) != 0) return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)))
    if (commandfile) commandfile.run(client,message,args)
});

client.login(config.token);