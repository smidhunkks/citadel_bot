const telegraf = require('telegraf');
const mongoose = require('mongoose');
const Link = require('./model/schema');
require('dotenv').config();

const Dburl = process.env.DB_url;
var dbconnect = mongoose.connect(Dburl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log("db connected");
    })
    .catch((err) => {
        console.log(err);
    })

const Bot = new telegraf(process.env.Bot_Token);

Bot.start((res) => res.reply("Welcome"));
Bot.hears('hi', (res) => res.reply("how are you?"));
Bot.command('help', (ctx) => {
    ctx.reply("List of Available commands are:\n- /List_all : Displays all available books \n- /request <book name> : Returns the link of the ebook if exists\n"

    );
})
Bot.command('request', (ctx) => {
    //ctx.reply('Hello');
    let message = ctx["update"]["message"]["text"];
    let bname = message.substring(9, message.length);
    if (bname != "") {
        //console.log(bname);
        mongoose.connect(Dburl, { useNewUrlParser: true, useUnifiedTopology: true })
            .then((result) => {
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
    else {
        ctx.reply("Please follow the format\n /request <book name>");
    }
}
);
//this command displays the list of all books in the database
Bot.command('List_all', (ctx) => {
    let message = 'Available books are:\n';

    mongoose.connect(Dburl, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((result) => {

            Link.find()
                .then((result) => {
                    console.log(result);
                    result.forEach((data) => {
                        message += data["title"] + '\n';
                    })
                    ctx.reply(message);

                })
                .catch((err) => {
                    console.log(err);
                })

        })
        .catch((err) => {
            console.log(err);
        })

}

);

Bot.command('add', (ctx) => {
    let addmessage = ctx["update"]["message"]["text"];
    let newbname = addmessage.substring(5, addmessage.length);
    console.log(newbname);

    Bot.on('message', (data) => {
        // console.log(bname);
        // console.log(data);
        const dbdata = new Link({
            title: newbname,
            link: data.update.message.text
        });
        dbdata.save();
        data.deleteMessage();
        ctx.deleteMessage();
    });







});


Bot.launch();