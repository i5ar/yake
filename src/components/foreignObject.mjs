/* eslint-disable react/prop-types */

export default class ForeignObject extends React.Component {
  constructor() {
    super();
    this.state = {
      modes: [
        "add",      // 0
        "remove",   // 1
        "scale",    // 2
        "rotate",   // 3
        "translate" // 4
      ],
      modeIndex: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(evt) {
    const value = parseInt(evt.target.value, 10);
    if (value === 1) {  // remove
      this.props.handleChangeCallback(evt);
    } else {
      this.setState({
        modeIndex: value
      });
    }
  }

  handleClick(evt) {
    this.props.handleClickCallback(evt);
  }

  render() {
    const {unit, radius, layout, intl} = this.props;
    const {modes, modeIndex} = this.state;
    const r = layout.r || 0;
    const rx = unit * layout.rx || 0;
    const ry = unit * layout.ry || 0;

    const foreignObjectSelectOpts = {
      x: unit * layout.x + 20 || 0,  // 5
      y: unit * layout.y - 4 || 0,  // -19
      width: unit * layout.w || unit,
      height: 24,
      transform: `rotate(${r} ${rx} ${ry})`
    };
    const foreignObjectButtonOpts = {
      width: 24,
      height: 24,
      transform: `rotate(${r} ${rx} ${ry})`
    };
    const buttonOpts = {
      style: {
        width: foreignObjectButtonOpts.width,
        height: foreignObjectButtonOpts.height
      },
      onClick: this.handleClick
    }
    const zz = 20;  // 5
    const zzz = 7.5 - 15  // 7.5
    const xLeft = zz + unit * layout.x - foreignObjectButtonOpts.width || zz - foreignObjectButtonOpts.width;
    const xRight = zz + unit * layout.x + (unit * layout.w || unit) || zz + (unit * layout.w || unit);
    const yTopDown = unit * layout.y + zz || zz;
    const yBottomUp = unit * layout.y + (unit * layout.h - foreignObjectButtonOpts.height || unit - foreignObjectButtonOpts.height) + zz || 0 + (unit * layout.h - foreignObjectButtonOpts.height || unit - foreignObjectButtonOpts.height) + zz;
    const xCenter = zz + unit * layout.x - foreignObjectButtonOpts.width / 2 + (unit * layout.w || unit) / 2 || zz + foreignObjectButtonOpts.width / 2 + (unit * layout.w || unit) / 2;
    const yBottom = unit * layout.y + (unit * layout.h + zz || unit + zz) || 0 + (unit * layout.h + zz || unit + zz);
    const yCenter = unit * layout.y + (unit * layout.h / 2 - zzz || unit / 2 - zzz) || 0 + (unit * layout.h / 2 - zzz || unit / 2 - zzz);
    const right = {
      x: xRight,
      y: yCenter
    };
    const left = {
      x: xLeft,
      y: yCenter
    };
    const bottom = {
      x: xCenter,
      y: yBottom
    };
    const leftTop = {
      x: xLeft,
      // y: yCenter
    };
    const rightTopDown = {
      x: xRight,
      y: yTopDown
    };
    const rightBottomUp = {
      x: xRight,
      y: yBottomUp
    };
    const leftTopDown = {
      x: xLeft,
      y: yTopDown
    };
    const leftBottomUp = {
      x: xLeft,
      y: yBottomUp
    };
    const bottomRight = {
      x: zz + 15 + unit * layout.x - foreignObjectButtonOpts.width / 2 + (unit * layout.w || unit) / 2 || zz + 15 - foreignObjectButtonOpts.width / 2 + (unit * layout.w || unit) / 2,
      y: yBottom
    };
    const bottomLeft = {
      x: zz - 15 + unit * layout.x - foreignObjectButtonOpts.width / 2 + (unit * layout.w || unit) / 2 || zz - 15 + foreignObjectButtonOpts.width / 2 + (unit * layout.w || unit) / 2,
      y: yBottom
    };


    return e(Fragment, null,
      e("foreignObject", foreignObjectSelectOpts,
        e("form", null,
          e("select", {
            name: "mode",
            style: {
              width: foreignObjectSelectOpts.width,
              height: foreignObjectSelectOpts.height
            },
            onChange: this.handleChange
          }, this.state.modes.map((mode, i) => e("option", {
            key: i,
            value: i
          }, intl.formatMessage(m({
            id: mode,
            defaultMessage: mode,
          }))
          ))
          )
        )
      ),

      [2].includes(modeIndex) ? e("foreignObject", {
        ...rightTopDown,
        ...foreignObjectButtonOpts
      }, e("button", {
        ...buttonOpts,
        name: `${modes[modeIndex]}-right`,
        className: "fas fa-caret-right"
      })) : null,
      [2].includes(modeIndex) ? e("foreignObject", {
        ...rightBottomUp,
        ...foreignObjectButtonOpts
      }, e("button", {
        ...buttonOpts,
        name: `${modes[modeIndex]}-left`,
        className: "fas fa-caret-left"
      })) : null,

      [0, 3, 4].includes(modeIndex) ? e("foreignObject", {
        ...right,
        ...foreignObjectButtonOpts
      }, e("button", {
        ...buttonOpts,
        name: `${modes[modeIndex]}-right`,
        className: modeIndex === 3 ? "fas fa-redo-alt" : modeIndex === 0 ? "fas fa-plus" : "fas fa-caret-right"
      })) : null,
      [0, 3, 4].includes(modeIndex) ? e("foreignObject", {
        ...left,
        ...foreignObjectButtonOpts
      }, e("button", {
        ...buttonOpts,
        name: `${modes[modeIndex]}-left`,
        className: modeIndex === 3 ? "fas fa-undo-alt" : modeIndex === 0 ? "fas fa-plus" : "fas fa-caret-left"
      })) : null,

      [0, 4].includes(modeIndex) ? e("foreignObject", {
        ...bottom,
        ...foreignObjectButtonOpts
      }, e("button", {
        ...buttonOpts,
        name: `${modes[modeIndex]}-down`,
        className: modeIndex === 0 ? "fas fa-plus" : "fas fa-caret-down"
      })) : null,

      [2].includes(modeIndex) ? e("foreignObject", {
        ...bottomLeft,
        ...foreignObjectButtonOpts
      }, e("button", {
        ...buttonOpts,
        name: `${modes[modeIndex]}-up`,
        className: "fas fa-caret-up"
      })) : null,
      [2].includes(modeIndex) ? e("foreignObject", {
        ...bottomRight,
        ...foreignObjectButtonOpts
      }, e("button", {
        ...buttonOpts,
        name: `${modes[modeIndex]}-down`,
        className: "fas fa-caret-down"
      })) : null
    )
  }
}
