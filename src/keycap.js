/* eslint-disable react/prop-types */

import Rectangle from "./rectangle.js";
import Path from "./path.js";
import shadeColor from "./common/shade.js";
import {
  config
} from "./common/config.js";

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
    this.props.handleClickCallback_({...evt, name: "keydev", index: this.props.index});
  }

  handleKeyDown(evt) {
    // NOTE: Disable browser specific shortcuts.
    evt.preventDefault();

    this.props.handleKeyDownCallback(evt);
  }

  render() {
    const {c, t, w, h, p, hasProfile} = this.props;
    const u = 54;
    const radius = 5;

    let {r, rx, ry, x, y} = this.props;
    r = r || 0;
    rx = u * rx || 0;
    ry = u * ry || 0;
    x = u * x || 0;
    y = u * y || 0;

    const widthInner = u * w - 14;
    const widthOuter = u * w - 2;
    const heightInner = u * h - 14;
    const heightOuter = u * h - 2;
    const colorInner = c || config.layouts.c;
    const colorOuter = shadeColor(colorInner, -16);
    const colorText = t || config.layouts.t;

    const opts = {
      tabIndex: -1,
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
        fill: colorText
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
      return e(
        "g", opts,
        e(Rectangle, {
          className: "outer border",
          x: 1,
          y: 1,
          width: widthOuter || 52,
          height: heightOuter || 52,
          rx: radius,
          fill: colorOuter,
          stroke: this.props.keydev === this.props.index ? "var(--green)" : null
        }),
        e(Rectangle, {
          className: "inner border",
          x: 7,
          y: 4,
          width: widthInner || 40,
          height: heightInner || 40,
          rx: radius,
          fill: colorInner
        }),
        hasProfile && e(Rectangle, {
          x: 7,
          y: 4,
          width: widthInner || 40,
          height: heightInner || 40,
          rx: radius,
          fill: "url(#GRADIENT)"
        }),
        text
      );
    }

    const A = [p[0] * u, p[1] * u];
    const B = [p[2] * u, p[3] * u];
    const C = [p[4] * u, p[5] * u];
    const D = [p[6] * u, p[7] * u];
    const E = [p[8] * u, p[9] * u];
    const F = [p[10] * u, p[11] * u];

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
        fill: colorOuter,
        stroke: this.props.keydev === this.props.index ? "var(--green)" : null
      }),
      e(Path, {
        className: "inner border",
        d: dInner,
        fill: colorInner
      }),
      hasProfile && e(Path, {
        d: dInner,
        fill: "url(#GRADIENT)"
      }),
      text
    );
  }
}
