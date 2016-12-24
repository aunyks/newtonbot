var newton = require('./bot.js');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


rl.question('What do you think of Node.js? ', (answer) => {
  newton(answer, function(resp){
    console.log(answer+':\n'+resp);
    rl.close();
  });
});
