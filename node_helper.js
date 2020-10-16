var request = require('request');
var NodeHelper = require('node_helper');

module.exports = NodeHelper.create({
  start: function () {
    console.log('Starting node helper: ' + this.name);
  },

  getRandomInt: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  getSuperHero: function (payload) {
    var charId = this.getRandomInt(1, 731);
    var url = 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/' + charId + '.json';

    request(
      {
        url: url,
        method: 'GET',
      },
      (error, response, body) => {
        if (!error && response.statusCode == 200) {
          var result = JSON.parse(body);
          this.sendSocketNotification('SUPERHERO_RESULT', result);
        }
      }
    );
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === 'GET_SUPERHERO') {
      this.getSuperHero(payload);
    }
  },
});
