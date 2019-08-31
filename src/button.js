/* eslint-disable react/prop-types */
import Controller from "./controller.js";

const e = React.createElement;

export default class Button extends React.Component {
  constructor() {
    super();
    this.state = {
      layouts: true,
      housing: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * The name (evt.target.name) can be either "layouts", "case" or more.
   * @param {string} evt
   */
  handleClick(evt) {
    const {name} = evt.target;
    this.setState(s => {
      const _keys = Object.keys(s);
      const index = _keys.indexOf(name);
      if (index !== -1) _keys.splice(index, 1);
      return _keys.map(
        key => ({
          [key]: false
        })).reduce(
        (acc, cur) => ({
          ...acc,
          [Object.keys(cur)]: cur[Object.keys(cur)]
        }),
        {
          [name]: !s[name]
        }
      );
    });
  }

  render() {
    const {info, layout, keydev} = this.props;
    const style = {
      backgroundColor: "var(--orange)"
    };

    return e(
      "div", {
        className: "button",
        style: {
          margin: "0.5em 0"
        }
      },
      e(
        "div", {
          style: {
            margin: "auto",
            display: "block",
            textAlign: "center"
          }
        },
        e(
          "button", {
            style,
            type: "button",
            name: "layouts",
            className: this.state.layouts ? "pure-button pure-button-active" : "pure-button",
            onClick: this.handleClick
          }, "Layouts",
        ),
        e("button", {
          style,
          type: "button",
          name: "housing",
          className: this.state.housing ? "pure-button pure-button-active" : "pure-button",
          onClick: this.handleClick
        }, "Housing"),
      ),
      e(Controller, {
        state: this.state,
        info,
        layout,
        keydev,
        handleClickCallback_: this.props.handleClickCallback_,
        handleChangeCallback_: this.props.handleChangeCallback_
      })
    );
  }
}
