/* eslint-disable react/prop-types */
import Keycap from "./keycap.js";


const e = React.createElement;

export default class Device extends React.Component {
  render() {
    const keycaps = [];
    const {
      info,
      layout
    } = this.props;

    if (info && info.layouts && info.layouts[layout]) {
      for (let i = 0; i < info.layouts[layout].layout.length; i++) {
        keycaps.push(
          e(Keycap, {
            x: info.layouts[layout].layout[i].x,
            y: info.layouts[layout].layout[i].y,
            w: info.layouts[layout].layout[i].w,
            h: info.layouts[layout].layout[i].h,
            ks: info.layouts[layout].layout[i].ks,
            p: info.layouts[layout].layout[i].p,
            r: info.layouts[layout].layout[i].r,
            rx: info.layouts[layout].layout[i].rx,
            ry: info.layouts[layout].layout[i].ry,
            label: info.layouts[layout].layout[i].label,
            code: "KC_NO",
            keys: [],
          })
        );
      }
    }
    const width = info && info.width ? 54 * info.width + 1 : 0;
    const height = info && info.height ? 54 * info.height + 1 : 0;
    return e(
      "div", {
        className: "device"
      },
      e("svg", {
        width,
        height,
        viewBox: `0 0 ${width} ${height}`
      }, keycaps)
    );
  }
}
