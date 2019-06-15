/* eslint-disable react/prop-types */
const e = React.createElement;

export default class Controller extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    this.props.handleClickCallback_(evt);
  }

  render() {
    const {info, layout, active} = this.props;

    return e(
      "div",
      {
        className: active ? "controller active" : "controller",
      },
      e(
        "div", {
          className: "pure-form"
        },
        e(
          "div",
          null,
          e("button", {
            name: "remove",
            className: "pure-button",
            onClick: this.handleClick,
          }, "-"),
          e("input", {
            type: "text",
            size: 4,
            value: info.layouts ? info.layouts[layout].layout.length : 0,
          }),
          e("button", {
            name: "add",
            className: "pure-button",
            onClick: this.handleClick,
          }, "+")
        ),
      ),
      e(
        "div",
        {
          className: "pure-form"
        },
        e(
          "div",
          null,
          e("button", {
            name: "decrease-x",
            className: "pure-button",
            onClick: this.handleClick,
          }, "←"),
          e("input", {type: "text", size: 4}),
          e("button", {
            name: "increase-x",
            className: "pure-button",
            onClick: this.handleClick,
          }, "→")
        ),
        e(
          "div",
          null,
          e("button", {
            name: "decrease-y",
            className: "pure-button",
            onClick: this.handleClick,
          }, "↓"),
          e("input", {type: "text", size: 4}),
          e("button", {
            name: "increase-y",
            className: "pure-button",
            onClick: this.handleClick,
          }, "↑")
        ),
        e(
          "div",
          null,
          e("button", {
            name: "clockwise-r",
            className: "pure-button",
            onClick: this.handleClick,
          }, "↻"),
          e("input", {type: "text", size: 4}),
          e("button", {
            name: "counterclockwise-r",
            className: "pure-button",
            onClick: this.handleClick,
          }, "↺")
        )
      )
    );
  }
}
