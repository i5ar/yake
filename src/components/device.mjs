/* eslint-disable react/prop-types */
import Keycap from "./keycap.mjs";
import Cross from "./cross.mjs";
import Polygon from "./polygon.mjs";
import {
  getSize
} from "../common/size.mjs";

export default class Device extends React.Component {
  constructor() {
    super();
    this.state = {
      u: 54,
      radius: 5
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    const client = evt.target.getBoundingClientRect();
    const x = evt.clientX - client.left;
    const y = evt.clientY - client.top;
    console.log(x / this.state.u, y / this.state.u);
  }

  render() {
    const {
      info,
      selectedKey,
      layout,
      isPrint,
      hasProfile,
      hasCase,
      defaultValues
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

    // NOTE: Case.
    const {u, radius} = this.state;
    const shape_ = info?.housing ? Object.keys(info.housing)[0] : null;
    const color = shape_ ? info.housing[shape_]?.color || defaultValues.housing.color : null;
    const shapes = shape_ ? info.housing[shape_]?.shape.map(
      (shape, i) => {
        if (shape.p) return e("polygon", {
          key: i,
          points: shape.p.map(point => point * u).join(","),
          fill: color,
          strokeWidth: radius * 2,
          stroke: color,
          strokeLinejoin: "round"
        });
        if (shape.w && shape.h) return e("rect", {
          key: i,
          x: shape.x * u + 5 || 5,
          y: shape.y * u + 5 || 5,
          width: shape.w * u,
          height: shape.h * u,
          fill: color,
          strokeWidth: radius * 2,
          stroke: color,
          strokeLinejoin: "round"
        });
      }
    ) : null;

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
        e(
          "g",
          {
            id: "viewport"
          },
          hasCase ? e(
            "g",
            null,
            shapes
          ) : null,
          // NOTE: Add origin cross.
          info?.layouts?.[layout].layout.map(
            (layout, i) => i === selectedKey ? e(
              Cross, {
                key: i,
                rx: layout.rx * u || 0,
                ry: layout.ry * u || 0
              }
            ) : null
          ),
          e(
            "g", {
              transform: "translate(5, 5)"
            },
            // NOTE: Add keycaps.
            info?.layouts?.[layout].layout.map(
              (layout, i) => e(Keycap, {
                key: i,
                index: i,
                u,
                radius,
                x: u * layout.x || 0,
                y: u * layout.y || 0,
                w: layout.w,
                h: layout.h,
                ks: layout.ks,
                p: layout.p,
                c: layout.c,
                t: layout.t,
                r: layout.r || 0,
                rx: u * layout.rx || 0,
                ry: u * layout.ry || 0,
                label: layout.label,
                code: "KC_NO",
                keys: [],
                selectedKey,
                isPrint,
                hasProfile,
                defaultValues,
                handleClickCallback_: this.props.handleClickCallback_,
                handleKeyDownCallback: this.props.handleKeyDownCallback
              })
            )
          ),
          // NOTE: Add arrows.
          info?.layouts?.[layout].layout.map(
            (layout, i) => i === selectedKey ? e(
              Polygon, {
                key: i,
                width: u * layout.w - 2 || u - 2,
                height: u * layout.h - 2 || u - 2,
                x: u * layout.x || 0,
                y: u * layout.y || 0,
                rx: u * layout.rx || 0,
                ry: u * layout.ry || 0,
                r: layout.r || 0,
                shape: "arrow-right",
                }
            ) : null
          )
        )
      )
    );
  }
}
