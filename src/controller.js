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
    const {info, layout, active, keydev} = this.props;
    const selectedKeycap = info.layouts ? info.layouts[layout].layout[keydev] : {};


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
          e("input", {
            type: "text",
            value: selectedKeycap && selectedKeycap.x !== undefined ? selectedKeycap.x : "",
            size: 4,
          }),
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
          e("input", {
            type: "text",
            value: selectedKeycap && selectedKeycap.y !== undefined ? selectedKeycap.y : "",
            size: 4,
          }),
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
          e("input", {
            type: "text",
            value: selectedKeycap && selectedKeycap.r !== undefined ? selectedKeycap.r : "",
            size: 4,
          }),
          e("button", {
            name: "counterclockwise-r",
            className: "pure-button",
            onClick: this.handleClick,
          }, "↺")
        )
      ),
      e(
        "div", {
          className: "pure-form"
        },
        e(
          "div",
          null,
          e("button", {
            name: "decrease-rx",
            className: "pure-button",
            onClick: this.handleClick,
          }, "⤶"),
          e("input", {
            type: "text",
            value: selectedKeycap && selectedKeycap.rx !== undefined ? selectedKeycap.rx : "",
            size: 4,
          }),
          e("button", {
            name: "increase-rx",
            className: "pure-button",
            onClick: this.handleClick,
          }, "⤷")
        ),
        e(
          "div",
          null,
          e("button", {
            name: "decrease-ry",
            className: "pure-button",
            onClick: this.handleClick,
          }, "⤵"),
          e("input", {
            type: "text",
            value: selectedKeycap && selectedKeycap.ry !== undefined ? selectedKeycap.ry : "",
            size: 4,
          }),
          e("button", {
            name: "increase-ry",
            className: "pure-button",
            onClick: this.handleClick,
          }, "⤴")
        )
      ),
      e(
        "div", {
          className: "pure-form"
        },
        e(
          "div", {
            style: {
              float: "right",
              marginBottom: "1em",
            }
          },
          e("label", null, "Label: "),
          e("input", {
            type: "text",
            value: selectedKeycap && selectedKeycap.label !== undefined ? selectedKeycap.label : "",
          })
        ),
        e("br", null),
        e(
          "div", null,
          e("label", null, "Points (ISO): "),
          e("textarea", {
            value: selectedKeycap && selectedKeycap.p !== undefined ? selectedKeycap.p : "",
          })
        ),
      )
    );
  }
}
