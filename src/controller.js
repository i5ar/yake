/* eslint-disable react/prop-types */
const e = React.createElement;

export default class Controller extends React.Component {
  render() {
    return e(
      "div",
      {
        className: "controller"
      },
      e(
        "div",
        {
          className: "pure-form"
        },
        e(
          "div",
          null,
          e("button", {className: "pure-button"}, "+"),
          e("input", {type: "text"}),
          e("button", {className: "pure-button"}, "-")
        ),
        e(
          "div",
          null,
          e("button", {className: "pure-button"}, "←"),
          e("input", {type: "text"}),
          e("button", {className: "pure-button"}, "→")
        ),
        e(
          "div",
          null,
          e("button", {className: "pure-button"}, "↑"),
          e("input", {type: "text"}),
          e("button", {className: "pure-button"}, "↓")
        ),
        e(
          "div",
          null,
          e("button", {className: "pure-button"}, "↻"),
          e("input", {type: "text"}),
          e("button", {className: "pure-button"}, "↺")
        )
      )
    );
  }
}
