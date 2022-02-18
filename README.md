# MMM-MagicSuperHero

A module for [MagicMirror²](https://github.com/MichMich/MagicMirror) that shows a super hero character based on [this superhero api](https://akabab.github.io/superhero-api/).

## Install

1. Clone repository into `../modules/` inside your MagicMirror folder:
   - `git clone https://github.com/Lavve/MMM-MagicSuperHero`
2. Run `cd MMM-MagicSuperHero && npm install`
3. Add the module to the MagicMirror config.js

```javascript
{
    module: "MMM-MagicSuperHero",
    position: 'top_center',
    header: 'Super hero',
    config: {
        showPowerImage: true,
        showRoundPowerImage: false,
        showPowerImageGrey: false,
        showPowerStats: true,
        showPowerStatsColors: true,
        showPowerAppearence: true,
        appearanceUnit: 'metric',
        updateInterval: 60 * 60 * 1000,
        imagePosition: 'bottom',
    }
},
```

## Configuration options

| Configuration        | Default          | Type   | Description                                                                                             |
| -------------------- | ---------------- | ------ | ------------------------------------------------------------------------------------------------------- |
| showPowerImage       | `true`           | (bool) | Show a picture of the super hero                                                                                              |
| showRoundPowerImage  | `false`          | (bool) | Show round image. If `true` the picture can be cropped in a strange way                                                                                         |
| showPowerImageGrey   | `false`          | (bool) | Show image in greyscale                                                                                 |
| showPowerStats       | `true`           | (bool) | Show power statistics                                                                                   |
| showPowerStatsColors | `true`           | (bool) | Show power bars in bw or color                                                                                |
| showPowerAppearence  | `true`           | (bool) | Show appearance                                                                                         |
| appearanceUnit       | `'metric'`       | (str)  | Valid values are `'metric'` and `'imperal'`. Default is what is used in config`                                                             |
| updateInterval       | `60 * 60 * 1000` | (int)  | Time in milliseconds for next character. Default every 1h. Minimum is `3600000` (1 hour).                          |
| imagePosition        | `'bottom'`       | (str)  | Possible values are `'top'`, `'right'`, `'bottom'` or `'left'` |

## Collaborate

Pull requests, translations and suggestions for improvements are more than welcome.

## Donations

[🍻 Buy me a beer](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=SM9XRXUPPJM84&item_name=%40lavve+MagicMiror+Modules) if you like my modules! ❤️