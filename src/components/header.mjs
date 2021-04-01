/* eslint-disable react/prop-types */

import Section from "./section.mjs";

export default class Header extends React.Component {
  constructor() {
    super();
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
    const {
      info,
      intl,
      isLayouts,
      isHousing,
      layoutName,
      selectedKey,
      selectedCase,
      defaultValues,
      housingName
    } = this.props;

    return e(
      "header", null,
      e(Section, {
        isLayouts,
        isHousing,
        info,
        intl,
        layoutName,
        housingName,
        selectedKey,
        selectedCase,
        defaultValues,
        handleClickCallback: this.props.handleClickCallback,
        handleChangeCallback: this.props.handleChangeCallback
      })
    );
  }
}
