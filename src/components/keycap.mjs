/* eslint-disable react/prop-types */

import Rectangle from "./rectangle.mjs";
import Path from "./path.mjs";
import shadeColor from "../common/shade.mjs";

export default class Keycap extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.gRef = React.createRef();
  }

  get tspans() {
    if (this.props.label) return this.props.label.split("\n");
    return [];
  }

  handleClick(evt) {
    this.props.handleClickCallback(evt);
  }

  handleKeyDown(evt) {
    // NOTE: Disable browser specific shortcuts.
    evt.preventDefault();

    this.props.handleKeyDownCallback(evt);
  }

  render() {
    const {unit, radius, layouts, r, rx, ry, x, y, c, t, w, h, p, isPrint, hasProfile} = this.props;

    const widthInner = unit * w - 14;
    const widthOuter = unit * w - 2;
    const heightInner = unit * h - 14;
    const heightOuter = unit * h - 2;
    const colorInner = c || layouts.c;
    const colorOuter = shadeColor(colorInner, -16);
    const colorText = t || layouts.t;

    const opts = {
      tabIndex: -1,
      "data-index": this.props.index,
      ref: this.gRef,
      onClick: this.handleClick,
      onKeyDown: this.handleKeyDown,
      className: "keycap",
      transform: `
                rotate(${r} ${rx} ${ry})
                translate(${x}, ${y})`.replace(/\s+/g, " ").trim()
    };

    // TODO: Resolve multiline accordingly with KLE.
    const textLength = w !== undefined ? Math.floor(6 * (w - 0.25)) : 4;
    const text = e(
      "text", {
        // x: 13,
        // y: 37,
        "data-index": this.props.index,
        fill: isPrint ? "black" : colorText
      },
      this.tspans.map((l, i) => e(
        "tspan", {
          key: i,
          x: 13,
          y: 37,
          dy: i * -18
        }, l && l.substring(0, textLength)))
    );

    if (!this.props.p) {
      return e(Fragment, {}, e(
        "g", opts,
        e(Rectangle, {
          className: "outer border",
          x: 1,
          y: 1,
          width: widthOuter || unit - 2,
          height: heightOuter || unit -2,
          rx: radius,
          fill: isPrint ? "white" : colorOuter,
          stroke: isPrint ? "black" : this.props.selectedKey === this.props.index ? "var(--green)" : null,
          strokeWidth: isPrint ? 1 : 4
        }),
        e(Rectangle, {
          className: "inner border",
          x: 7,
          y: 4,
          width: widthInner || unit - 14,
          height: heightInner || unit - 14,
          rx: radius,
          fill: isPrint ? "white" : colorInner,
          stroke: isPrint ? "black" : null,
          strokeWidth: isPrint ? 1 : null
        }),
        hasProfile ? e(Rectangle, {
          x: 7,
          y: 4,
          width: widthInner || unit - 14,
          height: heightInner || unit - 14,
          rx: radius,
          fill: isPrint ? "white" : "url(#GRADIENT)"
        }) : null,
        text
      ));
    }

    const A = [p[0] * unit, p[1] * unit];
    const B = [p[2] * unit, p[3] * unit];
    const C = [p[4] * unit, p[5] * unit];
    const D = [p[6] * unit, p[7] * unit];
    const E = [p[8] * unit, p[9] * unit];
    const F = [p[10] * unit, p[11] * unit];

    const dOuter = `
            M ${+1 + A[0]} ${+1 + A[1] + radius}
            A ${radius} ${radius} 0 0 1 ${+1 + A[0] + radius} ${+1 + A[1]}
            H ${-1 + B[0] - radius}
            A ${radius} ${radius} 0 0 1 ${-1 + B[0]} ${+1 + B[1] + radius}
            V ${-1 + C[1] - radius}
            A ${radius} ${radius} 0 0 1 ${-1 + C[0] - radius} ${-1 + C[1]}
            H ${+1 + D[0] + radius}
            A ${radius} ${radius} 0 0 1 ${+1 + D[0]} ${-1 + D[1] - radius}
            V ${-1 + E[1] + radius}
            A ${radius} ${radius} 0 0 0 ${+1 + E[0] - radius} ${-1 + E[1]}
            H ${+1 + F[0] + radius}
            A ${radius} ${radius} 0 0 1 ${+1 + F[0]} ${-1 + F[1] - radius}
            Z`.replace(/\s+/g, " ").trim();

    const dInner = `
            M ${+7 + A[0]} ${+4 + A[1] + radius}
            A ${radius} ${radius} 0 0 1 ${+7 + A[0] + radius} ${+4 + A[1]}
            L ${-7 + B[0] - radius} ${+4 + B[1]}
            A ${radius} ${radius} 0 0 1 ${-7 + B[0]} ${+4 + B[1] + radius}
            L ${-7 + C[0]} ${-9 + C[1] - radius}
            A ${radius} ${radius} 0 0 1 ${-7 + C[0] - radius} ${-9 + C[1]}
            L ${+7 + D[0] + radius} ${-9 + D[1]}
            A ${radius} ${radius} 0 0 1 ${+7 + D[0]} ${-9 + D[1] - radius}
            L ${+7 + E[0]} ${-9 + E[1] + radius}
            A ${radius} ${radius} 0 0 0 ${+7 + E[0] - radius} ${-9 + E[1]}
            L ${+7 + F[0] + radius} ${-9 + F[1]}
            A ${radius} ${radius} 0 0 1 ${+7 + F[0]} ${-9 + F[1] - radius}
            Z`.replace(/\s+/g, " ").trim();

    return e(
      "g", opts,
      e(Path, {
        className: "outer border",
        d: dOuter,
        fill: isPrint ? "white" : colorOuter,
        stroke: isPrint ? "black" : this.props.selectedKey === this.props.index ? "var(--green)" : null,
        strokeWidth: isPrint ? 1 : 4
      }),
      e(Path, {
        className: "inner border",
        d: dInner,
        fill: isPrint ? "white" : colorInner,
        stroke: isPrint ? "black" : null,
        strokeWidth: isPrint ? 1 : null
      }),
      hasProfile ? e(Path, {
        d: dInner,
        fill: isPrint ? "white" : "url(#GRADIENT)"
      }) : null,
      text
    );
  }
}
