/* eslint-disable react/prop-types */

export default class ForeignObject extends React.Component {
  constructor() {
    super();
    this.state = {
      modes: [
        "add",
        "translate",
        "rotate",
        "scale"
      ],
      modeIndex: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(evt) {
    const {value} = evt.target;
    this.setState({
      modeIndex: parseInt(value, 10)
    });
  }

  handleClick(evt) {
    const {name, value} = evt.target;
    console.log(name, value);
  }

  render() {
    const {u, radius, layout} = this.props;
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
      onClick: this.handleClick,
      value: modes[modeIndex]
    }

    return e(Fragment, null,
      e("foreignObject", foreignObjectSelectOpts,
        e("form", null,
          e("select", {
            // id: "mode",
            style: {
              width: foreignObjectSelectOpts.width,
              height: foreignObjectSelectOpts.height
            },
            onChange: this.handleChange
          }, this.state.modes.map((mode, i) => e("option", {
            key: i,
            value: i
          }, mode))
          )
        )
      ),
      e("foreignObject", {
        x: 5 + u * layout.x + (u * layout.w || u) || 5 + (u * layout.w || u),
        y: u * layout.y + (u * layout.h / 2 - 7.5 || u / 2 - 7.5) || 0 + (u * layout.h / 2 - 7.5 || u / 2 - 7.5),
        ...foreignObjectButtonOpts
      }, e("button", {
        ...buttonOpts,
        name: "right"
      }, "+")
      ),
      e("foreignObject", {
        x: 5 + u * layout.x - foreignObjectButtonOpts.width || 5 - foreignObjectButtonOpts.width,
        y: u * layout.y + (u * layout.h / 2 - 7.5 || u / 2 - 7.5) || 0 + (u * layout.h / 2 - 7.5 || u / 2 - 7.5),
        ...foreignObjectButtonOpts
      }, e("button", {
        ...buttonOpts,
        name: "left"
      }, "+")
      ),
      e("foreignObject", {
        x: 5 + u * layout.x - foreignObjectButtonOpts.width / 2 + (u * layout.w || u) / 2 || 5 - foreignObjectButtonOpts.width / 2 + (u * layout.w || u) / 2,
        y: u * layout.y + (u * layout.h + 5 || u + 5) || 0 + (u * layout.h + 5 || u + 5),
        ...foreignObjectButtonOpts
      }, e("button", {
        ...buttonOpts,
        name: "down"
      }, "+")
      )
    )
  }
}
