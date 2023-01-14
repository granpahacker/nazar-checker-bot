require("dotenv").config(); //to start process from .env file
// get client and Intents
const { Client, GatewayIntentBits } = require('discord.js')
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent,
    ]
});

// Check that bot is online
client.on("ready", () => {
    console.log("NazarCheker is online!"); // message when bot is online
    client.user.setActivity('Терабонькає');
});

// Nazar command
client.on("messageCreate", (message) => {
    if (message.content === "Назар") {
        client.channels.cache.get('935587206343581740').send('Прошу не турбувати Назара!');
    }
});

// check for Nazar online status
client.on('presenceUpdate', (oldPresence, newPresence) => {
    // if other user update status, just return
    if (newPresence.userId !== '966282072144613417') return;
    // no changes, just return
    if (oldPresence.status === newPresence.status) return;
    // if new status != online, again, just return
    if (newPresence.status !== 'online') return;

    //send message if no errors
    try {
        client.channels.cache.get('935587206343581740').send('@everyone @everyone Назар появився онлайн!');
    } catch (error) {
        console.log(error);
    }
});

// Run a bot
client.login(process.env.TOKEN);