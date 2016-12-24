var request = require('request');
module.exports = function(messageText, callback){
  var command = messageText.match(/([/])\w+/g)[0];
  var operation = command.slice(1);
  var expression = messageText.slice(messageText.indexOf(operation) + operation.length);
  request(`https://newton.now.sh/${operation}/${expression}`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      body = JSON.parse(body);
      callback(`I ${operation}'d ${expression} and got:\n\n${body.result}`);
    }
  });
};
