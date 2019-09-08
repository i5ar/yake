/* eslint-disable react/prop-types */
const e = React.createElement;

export default class Form extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(evt) {
    this.props.onChangeCallback(evt.target.name, evt.target.files[0]);
  }

  handleClick(evt) {
    evt.target.value = "";
  }

  render() {
    const {formRef} = this.props;
    return e(
      "form", {
        className: "form",
        ref: formRef
      }, e("input", {
        className: "pure-button",
        type: "file",
        name: "info",
        accept: ".json",
        onChange: this.handleChange,
        onClick: this.handleClick
      })
    );
  }
}
