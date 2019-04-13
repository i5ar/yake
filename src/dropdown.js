/* eslint-disable react/prop-types */
import {
  fetchKeyboards,
  fetchKeyboard,
} from "./common/service.js";

const e = React.createElement;

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const {api, name, value, initial, history} = this.props;
    if (name === "keyboard") {
      if (!initial && value) history.push(`/${value}`);
      else if (initial) {
        let keyboard = history.location.pathname.substr(1);
        fetchKeyboards(api).then(keyboards => {
          if (!keyboards.includes(keyboard)) keyboard = value || keyboards[0];
          fetchKeyboard(api, keyboard).then(info => {
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
    const {options, name, value, custom, selectRef} = this.props;
    const option = options ? options.map(
      value => e("option", {value}, value)) : e("option");
    if (custom) option.push(e("option", {value}, value));

    const span = e("span", null,
      e("select", {
        ref: selectRef,
        name,
        value,
        onChange: this.handleChange,
      }, option));

    return e(
      "div", {
        className: "dropdown"
      }, span);
  }
}
