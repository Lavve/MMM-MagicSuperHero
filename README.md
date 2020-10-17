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
        showPowerAppearence: true,
        appearanceUnit: 'metric',
        updateInterval: 60 * 60 * 1000,
    }
},
```

## Configuration options

| Configuration       | Default          | Description                                                      |
| ------------------- | ---------------- | ---------------------------------------------------------------- |
| showPowerImage      | `true`           | (bool) Show image                                                |
| showRoundPowerImage | `false`          | (bool) Show round image                                          |
| showPowerImageGrey  | `false`          | (bool) Show image in greyscale                                   |
| showPowerStats      | `true`           | (bool) Show power statistics                                     |
| showPowerAppearence | `true`           | (bool) Show appearance                                           |
| appearanceUnit      | `'metric'`       | (str) 'metric' or 'imperal' units                                |
| updateInterval      | `60 * 60 * 1000` | (int) Time in milliseconds for next character. Default every 1h. |

## Collaborate

Pull requests and translations are welcome.
