/* eslint-disable react/prop-types */

export default class ForeignObject extends React.Component {
  constructor() {
    super();
    this.state = {
      modes: [
        "add",
        "subtract",
        "dimension",
        "rotate",
        "flit"
      ],
      modeIndex: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(evt) {
    const value = parseInt(evt.target.value, 10);
    if (value === 1) {  // subtract
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
    const {u, radius, layout, intl} = this.props;
    const {modes, modeIndex} = this.state;
    const r = layout.r || 0;
    const rx = u * layout.rx || 0;
    const ry = u * layout.ry || 0;

    const foreignObjectSelectOpts = {
      x: u * layout.x + 5 || 0,
      y: u * layout.y - 19 || 0,
      width: u * layout.w || u,
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
        x: 5 + u * layout.x + (u * layout.w || u) || 5 + (u * layout.w || u),
        y: u * layout.y + (u * layout.h / 2 - 7.5 || u / 2 - 7.5) || 0 + (u * layout.h / 2 - 7.5 || u / 2 - 7.5),
        ...foreignObjectButtonOpts
      }, e("button", {
        ...buttonOpts,
        name: `${modes[modeIndex]}-right`
      }, "+")
      ),
      modeIndex !== 3 ? e("foreignObject", {
        x: 5 + u * layout.x - foreignObjectButtonOpts.width || 5 - foreignObjectButtonOpts.width,
        y: u * layout.y + (u * layout.h / 2 - 7.5 || u / 2 - 7.5) || 0 + (u * layout.h / 2 - 7.5 || u / 2 - 7.5),
        ...foreignObjectButtonOpts
      }, e("button", {
        ...buttonOpts,
        name: `${modes[modeIndex]}-left`
      }, [2, 4].includes(modeIndex) ? "-" : "+")
      ) : null,
      modeIndex !== 2 ? e("foreignObject", {
        x: 5 + u * layout.x - foreignObjectButtonOpts.width / 2 + (u * layout.w || u) / 2 || 5 - foreignObjectButtonOpts.width / 2 + (u * layout.w || u) / 2,
        y: u * layout.y + (u * layout.h + 5 || u + 5) || 0 + (u * layout.h + 5 || u + 5),
        ...foreignObjectButtonOpts
      }, e("button", {
        ...buttonOpts,
        name: `${modes[modeIndex]}-down`
      }, modeIndex === 3 ? "-" : "+")
      ) : null
    )
  }
}
