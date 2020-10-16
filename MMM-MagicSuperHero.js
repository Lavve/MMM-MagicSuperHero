Module.register('MMM-MagicSuperHero', {
  defaults: {
    showPowerImage: true,
    showPowerStats: true,
    showPowerAppearence: true,
    appearanceUnit: 'metric', // metric or imperial
    updateInterval: 60 * 60 * 1000,
  },

  start: function () {
    Log.info('Starting module: ' + this.name);

    this.hero = {};

    this.config.updateInterval = this.config.updateInterval < 3600000 ? 3600000 : this.config.updateInterval;
    this.getCharacter();

    let self = this;
    setInterval(function () {
      self.getCharacter();
    }, self.config.updateInterval);
  },

  getStyles: function () {
    return ['MMM-MagicSuperHero.css'];
  },

  getCharacter: function () {
    this.sendSocketNotification('GET_SUPERHERO', this.config);
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === 'SUPERHERO_RESULT') {
      this.hero = payload;
      this.updateDom(1000);
    }
  },

  getDom: function () {
    var wrapper = document.createElement('div');

    Log.info('SUPERHERO DATA', this.hero);

    if (Object.keys(this.hero).length !== 0) {
      var heroWrapper = document.createElement('div');
      heroWrapper.className = 'MMM-MagicSuperHero-container';

      // var name = document.createElement('div');
      // name.classList.add('mmm-hero-name');
      // name.innerHTML = this.hero.name;
      // heroWrapper.appendChild(name);

      if (this.config.showPowerStats) {
        var statTable = document.createElement('table');
        statTable.classList.add('small');
        statTable.classList.add('mmm-hero-stats');

        for (var stat in this.hero.powerstats) {
          var statValue = this.hero.powerstats[stat];
          var dateRow = document.createElement('tr');
          var key = document.createElement('td');
          key.innerHTML = stat.charAt(0).toUpperCase() + stat.slice(1);

          var valCell = document.createElement('td');
          var valWrap = document.createElement('div');
          valWrap.classList.add('superhero__statwrap');
          var val = document.createElement('div');
          val.classList.add('superhero__statval');
          val.style.width = statValue + '%';

          valWrap.appendChild(val);
          valCell.appendChild(valWrap);
          dateRow.appendChild(key);
          dateRow.appendChild(valCell);
          statTable.appendChild(dateRow);
        }
        heroWrapper.appendChild(statTable);
      }

      if (this.config.showPowerAppearence) {
        var appTable = document.createElement('table');
        appTable.classList.add('small');
        appTable.classList.add('mmm-hero-app');

        for (var app in this.hero.appearance) {
          var val = this.hero.appearance[app];
          var dateRow = document.createElement('tr');
          var key = document.createElement('td');
          key.innerHTML = app.charAt(0).toUpperCase() + app.slice(1);

          var valCell = document.createElement('td');
          if (app === 'height') {
            val = this.config.appearanceUnit === 'metric' ? val[1] : val[0];
          }
          if (app === 'weight') {
            val = this.config.appearanceUnit === 'metric' ? val[1] : val[0];
          }
          valCell.innerHTML = val;

          dateRow.appendChild(key);
          dateRow.appendChild(valCell);
          appTable.appendChild(dateRow);
        }
        heroWrapper.appendChild(appTable);
      }

      if (this.config.showPowerImage) {
        var img = document.createElement('img');
        img.src = this.hero.images.sm;
        img.classList.add('mmm-hero-img');
        heroWrapper.appendChild(img);
      }

      this.data.header = this.hero.name;

      wrapper.appendChild(heroWrapper);
    }

    return wrapper;
  },
});
