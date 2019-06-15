/* eslint-disable react/prop-types */
import Controller from "./controller.js";

const e = React.createElement;

export default class Button extends React.Component {
  constructor() {
    super();
    this.state = {
      active: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(s => ({
      active: !s.active,
    }));
  }

  render() {
    const {info, layout} = this.props;

    return e("div", null, e(
      "button", {
        style: {
          width: "100%",
          borderRadius: 0,
          backgroundColor: "var(--orange)",
        },
        type: "button",
        className: "pure-button",
        onClick: this.handleClick,
      }, this.state.active ? "Close" : "Open"),
    e(Controller, {
      active: this.state.active,
      info,
      layout,
      handleClickCallback_: this.props.handleClickCallback_,
    }));
  }
}
