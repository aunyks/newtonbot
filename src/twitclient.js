var Twitter = require('twitter');
var config  = require('config');

var TwitClient = new Twitter({
  consumer_key: config.get('twitterConsumerKey'),
  consumer_secret: config.get('twitterConsumerSecret'),
  access_token_key: config.get('twitterAccessTokenKey'),
  access_token_secret: config.get('twitterAccessTokenSecret')
});

module.exports.SINCE_ID = 813917837832159200;
// Get DMs: Retrieve DM senders and texts
module.exports.getDMs = function(id, callback){
  TwitClient.get('direct_messages', { count: 200, since_id: id }, function(error, data, response){
    if(error){
      console.log(error);
      throw error;
    }

    var DMs = [];
    data.forEach(function(dmData){
      DMs.push({
        user: dmData.sender_screen_name,
        msg : dmData.text
      });
      module.exports.SINCE_ID = dmData.id;
    });
    callback(DMs);

  });
};

// Send DMs: Send DM to a user
module.exports.respondDMs = function(username, msg, callback){
  TwitClient.post('direct_messages/new', { screen_name: username, text: msg }, function(error, data, response){
    if(error){
      console.log(error);
      throw error;
    }
    callback();
  });
};
