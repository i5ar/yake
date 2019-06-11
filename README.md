# Yet Another Keyboard Editor

YAKE (Yet Another Keyboard **Explorer**) has just become YAKE (Yet Another Keyboard **Editor**).

Design your keyboard directly from a text editor.  
The data structure is based on QMK `info.json` file.

## Features

- Mobile friendly;
- Rotated keys (`r`, `rx`, `ry`);
- ISO keys:

      "p": [-0.25, 0, 1.25, 0, 1.25, 2, 0, 2, 0, 1, -0.25, 1]

## Contribute

Feel free to pull and push.

> Make sure it doesn't work on IE!

### Installation

Download and spin a web server:

    git clone https://github.com/i5ar/yake.git yake && cd $_
    python -m http.server

### Test

Use Mocha and Chai on the browser (i.e. <http:localhost:5500/tests>).

## TODO

- Add spinner;
- Fix messed up CSS;
- Rename components decently;
- Add accordion?
- Fix router;
- Make the `info.json` source code editable?
- Make the keyboard representation editable?
- Support KLE?

## Disclaimer

This project is not directly related to QMK Firmware.

## License

### Third-party licenses

- [Ace](https://github.com/ajaxorg/ace/blob/master/LICENSE);
- [Noty](https://github.com/needim/noty/blob/master/LICENSE.txt);
- [Pure](https://github.com/pure-css/pure/blob/master/LICENSE);
- [React](https://github.com/facebook/react/blob/master/LICENSE);
- [React Router](https://github.com/ReactTraining/react-router/blob/master/LICENSE).
