/* eslint-disable react/prop-types */
import Keycap from "./keycap.js";
import {
  getSize
} from "./common/size.js";
import {
  config
} from "./common/config.js";

export default class Device extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    const client = evt.target.getBoundingClientRect();
    const x = evt.clientX - client.left;
    const y = evt.clientY - client.top;
    console.log(x / 54, y / 54);
  }

  render() {
    const u = 54;
    let origin;
    const keycaps = [];
    const shapes = [];
    const {
      info,
      keydev,
      layout,
      hasProfile,
      hasCase
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
            stopColor: "var(--base03)",
            stopOpacity: "0"
          }
        ),
        e(
          "stop", {
            offset: "40%",
            stopColor: "var(--base03)",
            stopOpacity: "0.1"
          }
        ),
        e(
          "stop", {
            offset: "60%",
            stopColor: "var(--base03)",
            stopOpacity: "0.1"
          }
        ),
        e(
          "stop", {
            offset: "100%",
            stopColor: "var(--base03)",
            stopOpacity: "0"
          }
        )
      )
    );

    if (info && info.layouts && info.layouts[layout]) {
      for (let i = 0; i < info.layouts[layout].layout.length; i++) {
        // NOTE: Add keycaps.
        keycaps.push(
          e(Keycap, {
            key: i,
            x: info.layouts[layout].layout[i].x,
            y: info.layouts[layout].layout[i].y,
            w: info.layouts[layout].layout[i].w,
            h: info.layouts[layout].layout[i].h,
            ks: info.layouts[layout].layout[i].ks,
            p: info.layouts[layout].layout[i].p,
            c: info.layouts[layout].layout[i].c,
            t: info.layouts[layout].layout[i].t,
            r: info.layouts[layout].layout[i].r,
            rx: info.layouts[layout].layout[i].rx,
            ry: info.layouts[layout].layout[i].ry,
            label: info.layouts[layout].layout[i].label,
            code: "KC_NO",
            keys: [],
            index: i,
            keydev,
            hasProfile,
            handleClickCallback_: this.props.handleClickCallback_,
            handleKeyDownCallback: this.props.handleKeyDownCallback
          })
        );

        // NOTE: Show origin rx, ry.
        const {rx, ry} = info.layouts[layout].layout[i];
        const fill = "var(--base0)";
        if (i === keydev) {
          origin = e(
            "g", {
              transform: `translate(${rx * u || 0}, ${ry * u || 0})`
            },
            e("circle", {
              cx: 5,
              cy: 5,
              r: 5,
              fill
            }),
            e("rect", {
              width: 2,
              height: 18,
              x: 4,
              y: -4,
              fill
            }),
            e("rect", {
              width: 18,
              height: 2,
              x: -4,
              y: 4,
              fill
            })
          );
        }
      }
    }

    // NOTE: Case.
    if (info && info.housing) {
      const shape = Object.keys(info.housing)[0];
      for (let i = 0; i < info.housing[shape].shape.length; i++) {
        const radius = 5;
        const color = info.housing[shape].color || config.housing.color;
        if (info.housing[shape].shape[i].p) {
          const p = info.housing[shape].shape[i].p.map(point => point * u);
          shapes.push(
            e("polygon", {
              key: i,
              points: p.join(","),
              fill: color,
              strokeWidth: radius * 2,
              stroke: color,
              strokeLinejoin: "round"
            })
          );
        }
        if (info.housing[shape].shape[i].w && info.housing[shape].shape[i].h) {
          shapes.push(
            e("rect", {
              key: i,
              x: info.housing[shape].shape[i].x * u + 5 || 5,
              y: info.housing[shape].shape[i].y * u + 5 || 5,
              width: info.housing[shape].shape[i].w * u,
              height: info.housing[shape].shape[i].h * u,
              fill: color,
              strokeWidth: radius * 2,
              stroke: color,
              strokeLinejoin: "round"
            })
          );
        }
      }
    }

    let [width, height] = Object.keys(info).length !== 0 ? [info.width, info.height] : [0, 0];

    // NOTE: Guess size when `width` and `height` are not present in `info.json`.
    const size = getSize(info, layout);
    const [_width, _height] = size || [0, 0];

    width = 10 + 1 + u * (width || _width);
    height = 10 + 1 + u * (height || _height);

    return e(
      "div", {
        className: "device",
        ref: this.props.deviceRef
      },
      e(
        "svg", {
          xmlns: "http://www.w3.org/2000/svg",
          width,
          height,
          viewBox: `0 0 ${width} ${height}`,
          onClick: this.handleClick
        },
        defs,
        hasCase ? e("g", null, shapes) : null,
        origin,
        e(
          "g", {
            transform: "translate(5, 5)"
          }, keycaps
        )
      )
    );
  }
}
