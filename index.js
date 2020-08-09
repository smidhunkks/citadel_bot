const telegraf = require('telegraf');

const Bot = new telegraf("1364496503:AAF-8IOnBfC1iU3pEQHGLHp4my_Pz2mjqb0");

Bot.start((res) => res.reply("Welcome"));
Bot.hears('hi', (res) => res.reply("how are you?"));
Bot.command('request', (ctx) => {
    ctx.reply('Hello');
    let message=ctx["update"]["message"]["text"];
    let bname=message.substring(9,message.length);
    console.log(bname);
}
);
Bot.launch();