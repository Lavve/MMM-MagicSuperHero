Module.register('MMM-MagicSuperHero', {
  defaults: {
    showPowerImage: true,
    showRoundPowerImage: false,
    showPowerImageGrey: false,
    showPowerStats: true,
    showPowerStatsColors: true,
    showPowerAppearence: true,
    appearanceUnit: 'metric', // metric or imperial
    updateInterval: 60 * 60 * 1000,
    imagePosition: 'bottom',
  },

  isAlter: true,

  start: function () {
    Log.info('Starting module: ' + this.name);

    this.hero = {};
    this.loaded = false;

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

  getTranslations: function () {
    return {
      en: 'translations/en.json',
      sv: 'translations/sv.json',
    };
  },

  getCharacter: function () {
    this.sendSocketNotification('GET_SUPERHERO', this.config);
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === 'SUPERHERO_RESULT') {
      this.loaded = true;
      this.hero = payload;
      this.updateDom(1000);
    }
  },

  getDom: function () {
    var wrapper = document.createElement('div');

    if (!this.loaded) {
      wrapper.innerHTML = this.translate('LOADING');
      wrapper.className = 'dimmed light small';
      return wrapper;
    }

    Log.info('SUPERHERO DATA', this.hero);

    if (Object.keys(this.hero).length !== 0) {
      var heroWrapper = document.createElement('div'),
        heroTableWrapper = document.createElement('div'),
        imgPos = this.config.imagePosition;

      if (this.config.imagePosition === 'alterHorizontal') {
        imgPos = this.isAlter ? 'left' : 'right';
        this.isAlter = !this.isAlter;
      } else if (this.config.imagePosition === 'alterVertical') {
        imgPos = this.isAlter ? 'top' : 'bottom';
        this.isAlter = !this.isAlter;
      } else {
        imgPos = this.config.imagePosition;
      }

      heroWrapper.classList.add('MMM-MagicSuperHero-container');
      heroWrapper.classList.add(imgPos);
      heroTableWrapper.classList.add('mmm-table-wrapper');

      if (this.config.showPowerStats) {
        var statTable = document.createElement('table');
        statTable.classList.add('small');
        statTable.classList.add('mmm-hero-stats');

        for (var stat in this.hero.powerstats) {
          var statValue = this.hero.powerstats[stat];
          var dataRow = document.createElement('tr');
          var key = document.createElement('td');
          key.innerHTML = this.translate(stat);

          var valCell = document.createElement('td');
          var valWrap = document.createElement('div');
          valWrap.classList.add('superhero__statwrap');
          var val = document.createElement('div');
          val.classList.add('superhero__statval');
          if (this.config.showPowerStatsColors) {
            val.classList.add(stat.toLowerCase());
          }
          val.style.width = statValue + '%';

          valWrap.appendChild(val);
          valCell.appendChild(valWrap);
          dataRow.appendChild(key);
          dataRow.appendChild(valCell);
          statTable.appendChild(dataRow);
        }
        heroTableWrapper.appendChild(statTable);
      }

      if (this.config.showPowerAppearence) {
        var appTable = document.createElement('table');
        appTable.classList.add('small');
        appTable.classList.add('mmm-hero-app');

        for (var app in this.hero.appearance) {
          var val = this.hero.appearance[app];

          if (val) {
            var dataRow = document.createElement('tr');
            var key = document.createElement('td');
            key.innerHTML = this.translate(app);

            var valCell = document.createElement('td');
            switch (app) {
              case 'height':
                val = this.config.appearanceUnit === 'metric' ? val[1] : val[0];
                val = parseInt(val, 10) > 0 ? val : '-';
                break;
              case 'weight':
                val = this.config.appearanceUnit === 'metric' ? val[1] : val[0];
                val = parseInt(val, 10) > 0 ? val : '-';
                break;
              case 'gender':
                val = val !== '-' ? this.translate(val.toLowerCase()) : '-';
                break;
              default:
                val = this.translate(val.toLowerCase());
            }

            valCell.innerHTML = val.charAt(0).toUpperCase() + val.slice(1);

            if (val !== '-') {
              dataRow.appendChild(key);
              dataRow.appendChild(valCell);
              appTable.appendChild(dataRow);
            }
          }
        }
        heroTableWrapper.appendChild(appTable);
      }

      heroWrapper.appendChild(heroTableWrapper);

      if (this.config.showPowerImage) {
        var imgWrapper = document.createElement('div');
        imgWrapper.classList.add('mmm-hero-img-wrapper');

        if (this.config.showRoundPowerImage) {
          imgWrapper.classList.add('round');
        }
        if (this.config.showPowerImageGrey) {
          imgWrapper.classList.add('grey');
        }

        var img = document.createElement('img');
        img.src = this.hero.images.sm;
        img.classList.add('mmm-hero-img');
        imgWrapper.appendChild(img);
        heroWrapper.appendChild(imgWrapper);
      }

      this.data.header = this.hero.name;

      wrapper.appendChild(heroWrapper);
    } else {
      setTimeout(function () {
        this.getCharacter();
      }, 10 * 1000);
    }

    return wrapper;
  },
});
