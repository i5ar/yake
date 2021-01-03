/* eslint-disable react/prop-types */
import {
  fetchKeyboards,
  fetchKeyboard
} from "./common/service.js";

const e = React.createElement;

export default class Dropdown extends React.Component {
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
    this.props.onChangeCallback(evt.target.name, evt.target.value);
  }

  render() {
    const {options, name, value, isCustom, selectRef} = this.props;
    const option = options ? options.map(
      (value, i) => e("option", {
        key: i,
        value
      }, value)) : e("option");
    if (isCustom) option.push(e("option", {value}, value));

    const span = e("span", null,
      e("select", {
        ref: selectRef,
        name,
        value,
        onChange: this.handleChange
      }, option));

    return e(
      "div", {
        className: "dropdown"
      }, span);
  }
}
