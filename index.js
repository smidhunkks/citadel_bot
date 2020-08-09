const telegraf = require('telegraf');
const mongoose = require('mongoose');
const Link = require('./model/schema')

const Dburl = "mongodb+srv://testbotuser:testbotuser@links.qt7ih.mongodb.net/Link?retryWrites=true&w=majority";
var dbconnect = mongoose.connect(Dburl)
    .then((result) => {
        console.log("db connected");
    })
    .catch((err) => {
        console.log(err);
    })

const Bot = new telegraf("1364496503:AAF-8IOnBfC1iU3pEQHGLHp4my_Pz2mjqb0");

Bot.start((res) => res.reply("Welcome"));
Bot.hears('hi', (res) => res.reply("how are you?"));
Bot.command('request', (ctx) => {
    ctx.reply('Hello');
    let message = ctx["update"]["message"]["text"];
    let bname = message.substring(9, message.length);
    //console.log(bname);
    mongoose.connect(Dburl, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((result) => {
            // console.log(result);
            Link.find()
                .then((result) => {
                    console.log(result);
                    result.forEach((data) => {

                        if (data["title"] == bname) {
                            //console.log(data["title"]);
                            //console.log(data["link"]);
                            ctx.reply(data["link"]);
                        }
                    })

                })
                .catch((err) => {
                    console.log(err);
                })
            //ctx.reply(Link.find());
        })
        .catch((err) => {
            console.log(err);
        })

}

);

Bot.command('List_all', (ctx) => {
    let message='';
    
    mongoose.connect(Dburl, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((result) => {
            
            Link.find()
                .then((result) => {
                    console.log(result);
                    result.forEach((data)=>{
                        message+=data["title"]+'\n';
                            ctx.reply(message);
                    })
                    
                })
                .catch((err) => {
                    console.log(err);
                })
            //ctx.reply(Link.find());
        })
        .catch((err) => {
            console.log(err);
        })
   
}

);

Bot.command('add', (ctx) => {
    const data = new Link({
        title: "duckett",
        link: "https://drive.google.com/file/d/1eXntJnCaHYsjyUwK2FUFQaiVu5JaQcyD/view?usp=sharing"
    });
    data.save();

})
Bot.launch();