/* eslint-disable react/prop-types */

import {
  fetchKeyboards,
  fetchKeyboard
} from "../common/service.mjs";

export default class Select extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const {hasApi, name, value, isInitial, history} = this.props;
    if (name === "keyboard") {
      if (!isInitial && value) history.push(`/${value}`);
      else if (isInitial) {
        let keyboard = history.location.pathname.substr(1);
        fetchKeyboards(hasApi).then(keyboards => {
          if (!keyboards.includes(keyboard)) keyboard = value || keyboards[0];
          fetchKeyboard(hasApi, keyboard).then(info => {
            this.handleHash(keyboards, keyboard, info);
          });
        });
      }
    }
  }

  handleHash(...args) {
    this.props.onHashCallback(...args);
  }

  handleChange(evt) {
    this.props.handleChangeCallback(evt);
  }

  render() {
    const {options, name, value, isCustom, selectRef, borders} = this.props;
    const option = options ? options.map(
      (value, i) => e("option", {
        key: i,
        value
      }, value)
    ) : e("option");
    if (isCustom) option.push(e("option", {
      value,
      key: value
    }, value));

    return e("select", {
      style: {
        borderTopLeftRadius: borders?.[0] ? 0 : null,
        borderTopRightRadius: borders?.[1] ? 0 : null,
        borderBottomRightRadius: borders?.[2] ? 0 : null,
        borderBottomLeftRadius: borders?.[3] ? 0 : null
      },
      className: "dropdown",
      ref: selectRef,
      name,
      value,
      onChange: this.handleChange
    }, option);
  }
}
