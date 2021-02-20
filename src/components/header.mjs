/* eslint-disable react/prop-types */

import Section from "./section.mjs";

export default class Button extends React.Component {
  constructor() {
    super();
    this.state = {
      isLayouts: true,
      isHousing: false
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
    const {isLayouts, isHousing} = this.state;
    const {info, intl, layout, selectedKey, defaultValues} = this.props;
    const style = {
      backgroundColor: "var(--orange)"
    };

    return e(
      "header", {
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
            name: "isLayouts",
            className: isLayouts ? "pure-button pure-button-active" : "pure-button",
            onClick: this.handleClick
          }, "Layouts",
        ),
        e("button", {
          style,
          type: "button",
          name: "isHousing",
          className: isHousing ? "pure-button pure-button-active" : "pure-button",
          onClick: this.handleClick
        }, "Housing"),
      ),
      e(Section, {
        isLayouts,
        isHousing,
        info,
        intl,
        layout,
        selectedKey,
        defaultValues,
        handleClickCallback: this.props.handleClickCallback,
        handleChangeCallback: this.props.handleChangeCallback
      })
    );
  }
}
