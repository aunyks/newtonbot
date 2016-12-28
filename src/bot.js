var request = require('request');
module.exports = function(messageText, callback){
  try {
    var command = messageText.match(/([/])\w+/g)[0];
    var operation = command.slice(1);
    var expression = messageText.slice(messageText.indexOf(operation) + operation.length);
    request(`https://newton.now.sh/${operation}/${expression}`, function (error, response, body) {
      if (!JSON.parse(body).error && response.statusCode == 200) {
        body = JSON.parse(body);
        callback(`I ${operation}'d ${expression} and got:\n\n${body.result}`);
      } else {
        throw '';
      }
    });
  } catch(e){
    callback('Sorry...I didn\'t understand that command.\nI\'m a robot, so there\'s a special way to tell me what to do!');
  }
};
