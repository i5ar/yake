/* eslint-disable react/prop-types */
const e = React.createElement;

export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.props.onChangeCallback(evt.target.name, evt.target.value === "true");
  }

  render() {
    const {api} = this.props;
    const opts = ["QMK", "Mine"];

    return e("footer", {
      className: "footer pure-form",
      style: {
        backgroundColor: "#002b36",
        width: "100%",
        color: "#eee8d5",
        padding: "1em 0",
        display: "inline-flex",
      }
    }, opts.map(el => e("label", {
      style: {
        margin: ".5em",
        cursor: "pointer"
      },
      className: "pure-radio",
    }, e("input", {
      style: {
        margin: "0 .5em",
        cursor: "pointer"
      },
      type: "radio",
      name: "api",
      checked: api ? el === opts[0] : el === opts[1],
      onChange: this.handleChange,
      value: el === "QMK",
    }), el)));
  }
}
