/* eslint-disable react/prop-types */
const e = React.createElement;

export default class Form extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.props.onChangeCallback(evt.target.name, evt.target.files[0]);
  }

  render() {
    const {formRef} = this.props;
    return e(
      "form", {
        ref: formRef,
      }, e("input", {
        className: "pure-button",
        type: "file",
        name: "info",
        accept: ".json",
        onChange: this.handleChange,
      })
    );
  }
}
