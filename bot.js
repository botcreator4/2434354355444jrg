const Discord = require('discord.js');
const { Client, RichEmbed } = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();

let profile = require('./profile.json')
const bot_name = "GC Bot"

var thr;
var secret_word;
var words_game = false;
var otvet;


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.generateInvite(["ADMINISTRATOR"]).then(link =>{
    console.log(link);
});
  client.user.setActivity("!r help")
});


client.on('message', msg => {


    function flood() {
        for(var spam = 0; spam < 15; spam++) {
        msg.channel.send("flood flood flood flood flood flood flood flood");
        }
        thr = false;
    }

    if(msg.author.bot) return;
    if(msg.author.id === client.user.id) return;

    let uid = msg.author.id;

    if(!profile[uid]) {
        profile[uid] = {
            coins: 0,
            warns: 0,
            xp: 0,
            lvl: 0,
            bitcoins: 0.001,
            ferms: 1,
            discord: 0,
            skype: 0,
            teamspeak: 0,
            total_msg: 0
        };
    };
    let u = profile[uid];
    fs.writeFile('./profile.json', JSON.stringify(profile), (err)=>{
        if(err) console.log(err);
    });

     u.xp++;
     u.total_msg++;
     u.bitcoins+= 0.001 * u.ferms


     //levels
     if(u.xp >= 50 ) {
        u.lvl++;
        u.coins += 100;
        msg.reply(">>> *Поздравляем, вы получили " + u.lvl + ", уровень! Круто!*");
        u.xp = 0;
     }

    if (msg.content === '!r info') {
    const embed = new RichEmbed()
      .setTitle('Информация')
      .setColor(0xFF0000)
      // Set the main content of the embed
      .setDescription('Создатели: 𝙉𝙞𝙜𝙝𝙩⛧#5962, Obito#8043');
    // Send the embed to the same channel as the message
    msg.channel.send(embed);
  }

   
     if(msg.content == '!r ferm') {
        msg.channel.send('Информация о фермах:\n1) Когда вы пишете в чат, вы получаете 0,001 биткойн по умолчанию, имея одну ферму. Эта сумма зависит от количества ваших ферм. Если у вас 20 ферм, то при написании в чате вы получите 0.020 биткойнов\n\n2)!r shop - Вы можете купить биткойн-фермы в магазине\n3)!r sell - Продать биткойны\n\nБиткойн обменный курс: 1200 монет');
     }



    if(msg.content == "!r drugs") {
      msg.channel.send("!drugs discord - improves your condition, you become cheerful and strong (can be purchased in the store !r shop) Your nerves are getting stronger.\n!drugs skype - your eyes burst and 50% of your nerves fail to work (can be purchased in the store !r shop)\n!drugs teamspeak - You feel good but become homeless due to addiction (can be purchased in the store !r shop)");
    }




 
  if (msg.content === '!r help') {
    const embed = new RichEmbed()
      .setTitle('Help-Menu:')
      .setColor(0xFF0000)
      // Set the main content of the embed
      .setDescription('Помощь:\n\nCommands:\n!r profile - ваш профиль\n!r shop - магазин\n!r ferm - информация о биткоинах и фермах\n!r drugs - наркотики\n!r bet - игра в казино на 100 монет.\n!r info - информация о боте.\n\nИгры:\n!words - Игра "Угадай слово"\n(информация: !info words)\n\nФункции:\n!r flood - флуд...\n!r random - рандомное число от 1 до 10\n')
    // Send the embed to the same channel as the message
    msg.channel.send(embed);
  }



  if(msg.content == '!r sell') {
      if(u.bitcoins < 1) {
    msg.reply('Биткойны не могут быть проданы, если их количество меньше 1.000, если это ошибка, обратитесь к администратору.')
      }
      if(u.bitcoins >= 1) {
          var sum_add = u.bitcoins * 1600;
          u.coins += sum_add;
        msg.reply('Вы продали ' + u.bitcoins + ' биткойнов и получили ' + sum_add + ' монет')
          u.bitcoins-=u.bitcoins;
      }
  }



  if(msg.content == '!r bet') {
      u.coins-=100;
      var rand_sopernik = 0;
      var rand_play;
      var win;
      if(rand_sopernik == 0) {
    var rand_play = Math.floor(Math.random() * 51);
    chance = 25;
    if(rand_play >= chance) {
    u.coins+=200;
    msg.reply("Вы выиграли 100 монет\n\nКол-во участников: 2")
    }
    if(rand_play < 25) {
     msg.reply("Вы проиграли 100 монет\n\nКол-во участников: 2")
    }
      }
  }



   if(msg.content == '!info words') {
      msg.channel.send("1) Вам нужно ответить на вопрос, который вам задаст бот;\n2) Ответ всегда с маленькой буквы и в 1 слово\n3) Чтобы ответить, используйте: !r aswer слово\n4) Чтобы завершить игру, используйте:!r stop");
   }

   if(msg.content == "!r balance") {
      msg.reply("Ваш баланс: " + u.coins + " монет" + "\nБиткоины: " + u.bitcoins);
   }


if(msg.content == '!words' && words_game != true) {
    if(words_game == true && msg.content ==  '!words') {
    msg.reply('Игра началась!\nЧтобы закончить используйте !r stop')
    }
    var rand_word = Math.floor(Math.random() * 2);
    words_game = true;
    if(rand_word == 0) {
    secret_word = "апельсин";
    if(secret_word == "апельсин") {
        msg.reply("Мы это едим. Там много витамина C.\n\nЧтобы ответить на вопрос используйте !r answer слово");
        msg.channel.send("random num: " +  rand_word)
    }
}
    if(rand_word == 1) {
        words_game = true;
     secret_word = "microsoft";
    if(secret_word == "microsoft") {
        msg.channel.send("random num: " + rand_word)
        msg.reply("Это очень большая компания. Она основала Windows\n\nЧтобы ответить на вопрос используйте !r answer слово");
    }
    }
}

if(msg.content == "!r stop" && words_game == false) {
 msg.reply("Игра не проходит в данный момент!");
}


function answer_t() {
    u.coins += 100;
    msg.reply('Поздравляю!! Правильный ответ!\nВы получили 100 монет!.\nВаш баланс: ' + u.coins);
    otvet = true;
    words_game = false;
}








//aswers
if(msg.content == "!r answer апельсин" && secret_word == "апельсин") {
 answer_t();
}
 if(msg.content == "!r answer microsoft" && secret_word == "microsoft") {
 answer_t();
 }
else if(words_game == true && otvet != true && msg.content != "!words" && msg.content == "!r answer апельсин" && msg.content == "!r answer microsoft") {
    msg.reply('Неверный ответ!');
}
//aswers







//errors
if(msg.content == '!r stop' && words_game == true) {
    words_game = false;
    msg.reply('Игра окончена!');
}
//errors









  if(msg.content == '!r flood') {
    if(thr != true) {
        msg.channel.send("флуд начинается через 30 секунд")
        setTimeout(flood, 30000);
        thr = true;
    }
  }


  if(msg.content == '!r random') {
   var rand = Math.floor(Math.random() * 11);
            msg.channel.send("Рандомное число: " + rand);
  }



  if(msg.content == '!r shop') {
   msg.channel.send('Магазин:\n\n1) Повышение уровня\nОписание: повышает ваш уровень на 1 позицию)\nЦена: 150\n\n2) Коробка монет\nОписание: при покупке падает от 0 до 200 монет\nЦена: 100\n\n3) Биткоин Ферма\nОписание: добавляет вам 1 ферму\nЦена: 200\n\n4) Наркотики через Discord\nОписание: !r drugs\nЦена: 999\n\n5) Наркотики через Skype\nОписание: !r drugs\nЦена: 666\n\n6) Наркотики через TeamSpeak\nОписание: !r drugs\nЦена: 333 \n\nДля покупки используйте: !buy item');
  }









  if(msg.content == '!buy Повышение уровня') {
      if(u.coins < 150) {
          msg.reply("Недостаточно монет!\nВаш баланс: !r balance")
      }
      if(u.coins >= 150) {
          u.lvl++;
          u.coins -= 150;
          msg.reply('Уровень повышен!\nВаш уровень: ' + u.lvl + '\nВаш баланс: ' + u.coins)
      }
  }
  if(msg.content ==  '!buy Коробка монет') {
      if(u.coins < 100) {
          msg.reply("Недостаточно монет!\nВаш баланс: !r balance")
      }
      if(u.coins >= 100) {
          var rand = Math.floor(Math.random() * 201);
          u.coins -= 100;
          u.coins += rand;
          if(rand >= 100) {
              msg.reply("Тебе повезло, из коробки выпало " + rand + " монет!\nВаш баланс: " + u.coins, " (+" + rand-100 + "монет)");
          }
          if(rand <= 99) {
              msg.reply("Тебе не очень повезло, из коробки выпало " + rand + " монет!\nВаш баланс: " + u.coins + "монет");
          }
      }
  }
  if(msg.content == '!buy Биткоин Ферма') {
      if(u.coins < 200) {
          msg.reply("Недостаточно монет!\nВаш баланс: !r balance")
      }
      if(u.coins >= 200) {
          u.ferms++;
          u.coins -= 200;
          msg.reply('Вы успешно купили ферму!')
      }
  }

var rand_police;

  if(msg.content == '!buy Наркотики через Discord') {
      if(u.coins < 999) {
          msg.reply("Недостаточно монет!\nВаш баланс: !r balance")
      }
      if(u.coins >= 999) {
          u.discord++;
          u.coins -= 999;
          rand_police = Math.floor(Math.random() * 3);
        if(rand_police == 0 || rand_police == 1) {
          msg.reply('Вы успешно купили наркотики и использовали их!"')
      }
         if(rand_police == 2) {
            u.coins-=100;
            msg.reply('Очень жаль, но вас заметили при использовании наркоты. Чтобы вас не посадили вы заплатили 100 монет!')
         }
      }
  }
  if(msg.content == '!buy Наркотики через Skype') {
      if(u.coins < 666) {
          msg.reply("Недостаточно монет!\nВаш баланс: !r balance")
      }
      if(u.coins >= 666) {
          u.skype++;
          u.coins -= 666;
          rand_police = Math.floor(Math.random() * 3);
        if(rand_police == 0 || rand_police == 1) {
          msg.reply('Вы успешно купили наркотики и использовали их!')
      }
         if(rand_police == 2) {
            u.coins-=100;
            msg.reply('Очень жаль, но вас заметили при использовании наркоты. Чтобы вас не посадили вы заплатили 100 монет!')
         }
      }
  }
  if(msg.content == '!buy Наркотики через TeamSpeak') {
      if(u.coins < 333) {
          msg.reply("Недостаточно монет!\nВаш баланс: !r balance")
      }
      if(u.coins >= 333) {
          u.teamspeak++;
          u.coins -= 333;
          rand_police = Math.floor(Math.random() * 3);
        if(rand_police == 0 || rand_police == 1) {
          msg.reply('Вы успешно купили наркотики и использовали их!')
      }
         if(rand_police == 2) {
            u.coins-=100;
            msg.reply('Очень жаль, но вас заметили при использовании наркоты. Чтобы вас не посадили вы заплатили 100 монет!')
         }
      }
  }




      // Set the color of the embed



  if (msg.content === '!r profile') {
    const embed = new RichEmbed()
      .setTitle('Your Profile:')
      .setColor(0xFF0000)
      // Set the main content of the embed
      .setDescription('ID: '+ msg.author.id +'\n\nМонеток: ' + u.coins + '\nУровень: ' + u.lvl + '\nXP: ' + u.xp +  '\n\nНароты использовано:\nЧерез Discord: '  + u.discord  + '\nЧерез Skype: ' + u.skype  + '\nЧерез TeamSpeak: '  + u.teamspeak + '\n\nФермы: ' + u.ferms + "\nБиткоины: " + u.bitcoins + "\n\nВсего собщений: " + u.total_msg)
    // Send the embed to the same channel as the message
    msg.channel.send(embed);
  }
});



client.login('');




//message.channel.send('pong');