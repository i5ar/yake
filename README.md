# Yet Another Keyboard Explorer

YAKE let you visualize QMK keyboards (fetched form QMK API)
and a few keyboards of mine to illustrate all the implemented features.  
Keyboard maintainers can also use it to verify the correctness of the `info.json` file.

## Features

- Mobile friendly;
- Rotated keys (`r`, `rx`, `ry`):
- ISO keys (for the time being only polygons):

      "p": [-0.25, 0, 1.25, 0, 1.25, 2, 0, 2, 0, 1, -0.25, 1]

## Installation

In order to run it locally, spin a web server and snap your fingers.

## Test

It's a small app, but if you really want to test it you can do it with ease:

- Mocha, Chai and React Utils for BDD;
- Selenium for automated test:

      python tests/main.py

## Contribute

Feel free pull and push.  
Make sure it doesn't work on IE!

## TODO

- Add spinner;
- Fix messed up CSS and rename components decently;
- Add accordion?
- Fix router;
- Make the `info.json` source code editable?
- Make the keyboard representation editable?
- Support KLE?

## Disclaimer

This project is not directly related to QMK Firmware.

## License

### Third-party licenses

- [Noty](https://github.com/needim/noty/blob/master/LICENSE.txt);
- [Prism](https://github.com/PrismJS/prism/blob/master/LICENSE);
- [Pure](https://github.com/pure-css/pure/blob/master/LICENSE);
- [React](https://github.com/facebook/react/blob/master/LICENSE);
- [React Router](https://github.com/ReactTraining/react-router/blob/master/LICENSE).
