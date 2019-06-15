/* eslint-disable react/prop-types */
import Keycap from "./keycap.js";


const e = React.createElement;

export default class Device extends React.Component {
  render() {
    const keycaps = [];
    const {
      info,
      layout,
      hasProfile,
      hasCase,
    } = this.props;

    const defs = e(
      "defs", null,
      e(
        "linearGradient", {
          id: "GRADIENT"
        },
        e(
          "stop", {
            offset: "0%",
            stopColor: "black",
            stopOpacity: "0"
          }
        ),
        e(
          "stop", {
            offset: "40%",
            stopColor: "black",
            stopOpacity: "0.1"
          }
        ),
        e(
          "stop", {
            offset: "60%",
            stopColor: "black",
            stopOpacity: "0.1"
          }
        ),
        e(
          "stop", {
            offset: "100%",
            stopColor: "black",
            stopOpacity: "0"
          }
        )
      )
    );

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
            index: i,
            hasProfile,
            handleClickCallback_: this.props.handleClickCallback_,
          })
        );
      }
    }
    const width = info && info.width ? 54 * info.width + 1 + 10 : 0;
    const height = info && info.height ? 54 * info.height + 1 + 10 : 0;
    return e(
      "div", {
        className: "device",
        ref: this.props.deviceRef,
      },
      e(
        "svg", {
          width,
          height,
          viewBox: `0 0 ${width} ${height}`
        },
        defs,
        hasCase && e("rect", {
          width,
          height,
          rx: 5,
          fill: "#eee8d5",
        }),
        e(
          "g", {
            transform: "translate(5, 5)"
          },
          e("g", null, keycaps)
        )
      )
    );
  }
}
