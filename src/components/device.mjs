/* eslint-disable react/prop-types */
import Keycap from "./keycap.mjs";
import Cross from "./cross.mjs";
import ForeignObject from "./foreignObject.mjs";
import {
  getSize
} from "../common/size.mjs";

export default class Device extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    const {unit} = this.props.defaultValues;
    const client = evt.target.getBoundingClientRect();
    const x = evt.clientX - client.left;
    const y = evt.clientY - client.top;
    console.info(x / unit, y / unit);
  }

  render() {
    const {
      intl,
      info,
      selectedKey,
      layoutName,
      isPrint,
      hasProfile,
      hasCase
    } = this.props;

    const defs = e(
      "defs", null,
      // NOTE: Gradient.
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
      ),
      // NOTE: Patterns.
      e("pattern", {
        id: "BOXES",
        width: 10,
        height: 10,
        patternUnits: "userSpaceOnUse"
      }, e("g", {
        fill:'lightgray',
        fillRule: 'evenodd',
        fillOpacity: 1
      }, e("path", {
        d: "M0 0h10L0 10z"
      }
      ))),

      e("pattern", {
        id: "DIAGONALS",
        width: 6,
        height: 6,
        patternUnits: "userSpaceOnUse"
      }, e("g", {
        fill:'lightgray',
        fillRule: 'evenodd',
        fillOpacity: 1
      }, e("path", {
        d: "M5 0h1L0 6V5zM6 5v1H5z"
      }))),

      e("pattern", {
        id: "DOTS",
        width: 10,
        height: 10,
        patternUnits: "userSpaceOnUse"
      }, e("g", {
        fill:'lightgray',
        fillRule: 'evenodd',
        fillOpacity: 1
      }, e("circle", {
        cx:'3',
        cy:'3',
        r:'2'
      }),
      e("circle", {
        cx:'8',
        cy:'8',
        r:'2'
      })))
    );

    // NOTE: Case.
    const {unit, radius, housing, layouts} = this.props.defaultValues;
    const shape_ = info?.housing ? Object.keys(info.housing)[0] : null;
    const shapes = shape_ ? info.housing[shape_]?.shape.map(
      (shape, i) => {
        const color = info.housing?.[shape_].shape[i].c || housing.c;
        if (shape.p) return e("polygon", {
          key: i,
          points: shape.p.map(point => point * unit).join(","),
          fill: isPrint ? "url(#DIAGONALS)" : color,
          stroke: isPrint ? "lightgray" : color,
          strokeWidth: radius * 2,
          strokeLinejoin: "round"
        });
        if (shape.w && shape.h) return e("rect", {
          key: i,
          x: shape.x * unit + 5 || 5,
          y: shape.y * unit + 5 || 5,
          width: shape.w * unit,
          height: shape.h * unit,
          fill: isPrint ? "url(#DIAGONALS)" : color,
          stroke: isPrint ? "lightgray" : color,
          strokeWidth: radius * 2,
          strokeLinejoin: "round"
        });
      }
    ) : null;

    let [width, height] = Object.keys(info).length !== 0 ? [info.width, info.height] : [0, 0];

    // NOTE: Guess size when `width` and `height` are not present in `info.json`.
    const size = getSize(info, layoutName);
    const [_width, _height] = size || [0, 0];

    width = 10 + 1 + unit * (width || _width);
    height = 10 + 1 + unit * (height || _height);

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
          info?.layouts?.[layoutName].layout.map(
            (layout, i) => i === selectedKey && !isPrint ? e(
              Cross, {
                key: i,
                rx: layout.rx * unit || 0,
                ry: layout.ry * unit || 0
              }
            ) : null
          ),
          e(
            "g", {
              transform: "translate(5, 5)"
            },
            // NOTE: Add keycaps.
            info?.layouts?.[layoutName].layout.map(
              (layout, i) => e(Keycap, {
                key: i,
                index: i,
                unit,
                radius,
                layouts,
                x: unit * layout.x || 0,
                y: unit * layout.y || 0,
                w: layout.w,
                h: layout.h,
                ks: layout.ks,
                p: layout.p,
                c: layout.c,
                t: layout.t,
                r: layout.r || 0,
                rx: unit * layout.rx || 0,
                ry: unit * layout.ry || 0,
                label: layout.label,
                code: "KC_NO",
                keys: [],
                selectedKey,
                isPrint,
                hasProfile,
                handleClickCallback: this.props.handleClickCallback,
                handleKeyDownCallback: this.props.handleKeyDownCallback
              })
            )
          ),
          // NOTE: Add arrows.
          info?.layouts?.[layoutName].layout.map(
            (layout, i) => i === selectedKey ? e(
              ForeignObject, {
                key: i,
                intl,
                unit,
                radius,
                layout,
                handleClickCallback: this.props.handleClickCallback,
                handleChangeCallback: this.props.handleChangeCallback
              }
            ) : null
          )
        )
      )
    );
  }
}
