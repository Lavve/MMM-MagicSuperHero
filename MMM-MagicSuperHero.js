Module.register('MMM-MagicSuperHero', {
  defaults: {
    showPowerImage: true,
    showRoundPowerImage: false,
    showPowerImageGrey: false,
    showPowerStats: true,
    showPowerStatsColors: true,
    showPowerAppearence: true,
    appearanceUnit: config.units, // metric or imperial
    updateInterval: 60 * 60 * 1000,
    imagePosition: 'bottom',
  },

  isAlter: true,

  start: function () {
    Log.info(`Starting module: ${this.name}`);

    this.hero = {};
    this.loaded = false;

    this.config.updateInterval =
      this.config.updateInterval < 3600000
        ? 3600000
        : this.config.updateInterval;

    this.getCharacter();
    setInterval(() => {
      this.getCharacter();
    }, this.config.updateInterval);
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
    this.sendSocketNotification('GET_SUPERHERO');
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === 'SUPERHERO_RESULT') {
      this.loaded = true;
      this.hero = payload;
      console.log(payload);
      this.updateDom(1000);
    }
  },

  getDom: function () {
    const wrapper = document.createElement('div');

    if (!this.loaded) {
      wrapper.innerHTML = this.translate('LOADING');
      wrapper.className = 'dimmed light small';
      return wrapper;
    }

    const heroWrapper = document.createElement('div'),
      heroTableWrapper = document.createElement('div');
    let imgPos = this.config.imagePosition;

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

    const heroName = document.createElement('div');
    heroName.classList.add('mmm-hero-name', 'thin');
    heroName.innerHTML = this.hero.name;
    heroTableWrapper.appendChild(heroName);

    if (this.config.showPowerStats) {
      const statTable = document.createElement('table');
      statTable.classList.add('small');
      statTable.classList.add('mmm-hero-stats', 'thin');

      for (let stat in this.hero.powerstats) {
        const statValue = this.hero.powerstats[stat];
        const dataRow = document.createElement('tr');
        const keyEl = document.createElement('td');
        keyEl.classList.add('xsmall');
        keyEl.innerHTML = this.translate(stat);

        const valCell = document.createElement('td');
        const valWrap = document.createElement('div');
        valWrap.classList.add('superhero__statwrap');
        const statval = document.createElement('div');
        statval.classList.add('superhero__statval');
        if (this.config.showPowerStatsColors) {
          statval.classList.add(stat.toLowerCase());
        }
        statval.style.width = statValue + '%';

        valWrap.appendChild(statval);
        valCell.appendChild(valWrap);
        dataRow.appendChild(keyEl);
        dataRow.appendChild(valCell);
        statTable.appendChild(dataRow);
      }
      heroTableWrapper.appendChild(statTable);
    }

    if (this.config.showPowerAppearence) {
      const appTable = document.createElement('table');
      appTable.classList.add('small');
      appTable.classList.add('mmm-hero-app');

      for (let appearance in this.hero.appearance) {
        let val = this.hero.appearance[appearance];

        if (val) {
          const dataRow = document.createElement('tr');
          const appEl = document.createElement('td');
          appEl.classList.add('thin', 'xsmall');
          appEl.innerHTML = this.translate(appearance);

          const valCell = document.createElement('td');
          switch (appearance) {
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
            dataRow.appendChild(appEl);
            dataRow.appendChild(valCell);
            appTable.appendChild(dataRow);
          }
        }
      }
      heroTableWrapper.appendChild(appTable);
    }

    heroWrapper.appendChild(heroTableWrapper);

    if (this.config.showPowerImage) {
      const imgWrapper = document.createElement('div');
      imgWrapper.classList.add('mmm-hero-img-wrapper');

      if (this.config.showRoundPowerImage) {
        imgWrapper.classList.add('round');
      }

      if (this.config.showPowerImageGrey) {
        imgWrapper.classList.add('grey');
      }

      const img = document.createElement('img');
      img.src = this.hero.images.sm;
      img.classList.add('mmm-hero-img');
      imgWrapper.appendChild(img);
      heroWrapper.appendChild(imgWrapper);
    }

    this.data.header = this.hero.name;

    wrapper.appendChild(heroWrapper);

    return wrapper;
  },
});
