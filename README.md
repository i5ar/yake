# Yet Another Keyboard Editor

YAKE (Yet Another Keyboard **Explorer**) has just become YAKE (Yet Another Keyboard **Editor**).

A keyboard layout designer based on QMK ([`info.json`](https://beta.docs.qmk.fm/reference/reference_info_json)).

## Features

- Mobile friendly;
- Rotated keys (`r`, `rx`, `ry`);
- ISO keys (`p`):

      "p": [-0.25, 0, 1.25, 0, 1.25, 2, 0, 2, 0, 1, -0.25, 1]
- Polygonal case:

      "case": [{"p": [0, 0, 12, 0, 12, 4, 0, 4]}]
- SVG export.

## Contribute

Feel free to pull and push.

> Make sure it doesn't work on IE!

Please, avoid using server-side JavaScript implementations like Node.js and Deno:
YAKE should be easy and fast to install (it should work out of the box).

### Installation

Download and spin a web server:

    git clone https://github.com/i5ar/yake.git yake && cd $_
    python -m http.server

### Test

Use Mocha and Chai on the browser (i.e. <https://i5ar.github.io/yake/tests>).

## TODO

- [ ] Fix `rx`, `ry` in view box;
- [ ] Lock controller to the bottom;
- [ ] Add label position to the navbar;
- [ ] Add polygonal case;
- [ ] Add spinner;
- [ ] Add accordion?
- [x] Make the data structure (`info.json`) editable;
- [ ] Support KLE?

## Disclaimer

This project is not directly related to QMK Firmware.

## License

### Third-party licenses

- [Ace](https://github.com/ajaxorg/ace/blob/master/LICENSE);
- [Noty](https://github.com/needim/noty/blob/master/LICENSE.txt);
- [Pure](https://github.com/pure-css/pure/blob/master/LICENSE);
- [Popper](https://github.com/FezVrasta/popper.js/blob/master/LICENSE.md);
- [React](https://github.com/facebook/react/blob/master/LICENSE);
- [React Router](https://github.com/ReactTraining/react-router/blob/master/LICENSE);
- [Tippy](https://github.com/atomiks/tippyjs/blob/master/LICENSE).
