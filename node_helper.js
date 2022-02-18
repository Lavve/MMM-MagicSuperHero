var request = require('request');
var NodeHelper = require('node_helper');

module.exports = NodeHelper.create({
  start: function () {
    console.log('Starting node helper: ' + this.name);
  },

  getRandomInt: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  getSuperHero: function () {
    var url =
      'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/' +
      this.getRandomInt(1, 731) +
      '.json';

    request(
      {
        url: url,
        method: 'GET',
      },
      (error, response, body) => {
        if (!error && response.statusCode == 200) {
          var result = JSON.parse(body);
          this.sendSocketNotification('SUPERHERO_RESULT', result);
        } else {
          console.warn(error, response);
        }
      }
    );
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === 'GET_SUPERHERO') {
      this.getSuperHero();
    }
  },
});
