/* eslint-disable react/prop-types */

export default class ForeignObject extends React.Component {
  constructor() {
    super();
    this.state = {
      modes: [
        "add",
        "remove",
        "scale",
        "rotate",
        "translate"
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
      x: unit * layout.x + 5 || 0,
      y: unit * layout.y - 19 || 0,
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
      e("foreignObject", {
        x: 5 + unit * layout.x + (unit * layout.w || unit) || 5 + (unit * layout.w || unit),
        y: unit * layout.y + (unit * layout.h / 2 - 7.5 || unit / 2 - 7.5) || 0 + (unit * layout.h / 2 - 7.5 || unit / 2 - 7.5),
        ...foreignObjectButtonOpts
      }, e("button", {
        ...buttonOpts,
        name: `${modes[modeIndex]}-right`,
        className: modeIndex === 3 ? "fas fa-redo-alt" : "fas fa-caret-right"
      })
      ),
      e("foreignObject", {
        x: 5 + unit * layout.x - foreignObjectButtonOpts.width || 5 - foreignObjectButtonOpts.width,
        y: unit * layout.y + (unit * layout.h / 2 - 7.5 || unit / 2 - 7.5) || 0 + (unit * layout.h / 2 - 7.5 || unit / 2 - 7.5),
        ...foreignObjectButtonOpts
      }, e("button", {
        ...buttonOpts,
        name: `${modes[modeIndex]}-left`,
        className: modeIndex === 3 ? "fas fa-undo-alt" : "fas fa-caret-left"
      })
      ),
      modeIndex !== 3 ? e("foreignObject", {
        x: - 10 + unit * layout.x - foreignObjectButtonOpts.width / 2 + (unit * layout.w || unit) / 2 || -10 + foreignObjectButtonOpts.width / 2 + (unit * layout.w || unit) / 2,
        y: unit * layout.y + (unit * layout.h + 5 || unit + 5) || 0 + (unit * layout.h + 5 || unit + 5),
        ...foreignObjectButtonOpts
      }, e("button", {
        ...buttonOpts,
        name: `${modes[modeIndex]}-up`,
        className: "fas fa-caret-up"
      })
      ) : null,
      modeIndex !== 3 ? e("foreignObject", {
        x: 20 + unit * layout.x - foreignObjectButtonOpts.width / 2 + (unit * layout.w || unit) / 2 || 20 - foreignObjectButtonOpts.width / 2 + (unit * layout.w || unit) / 2,
        y: unit * layout.y + (unit * layout.h + 5 || unit + 5) || 0 + (unit * layout.h + 5 || unit + 5),
        ...foreignObjectButtonOpts
      }, e("button", {
        ...buttonOpts,
        name: `${modes[modeIndex]}-down`,
        className: "fas fa-caret-down"
      })
      ) : null
    )
  }
}
