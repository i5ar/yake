/* eslint-disable react/prop-types */
const e = React.createElement;

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = null;
  }

  componentDidUpdate() {
    this.handlePrism();
  }

  handlePrism() {
    const code = Prism.highlight(this.props.code, Prism.languages.json, "json");
    if (this.textInput) {
      this.textInput.innerHTML = "";
      this.textInput.insertAdjacentHTML("afterbegin", code);
    }
  }

  render() {
    return e("div", {
      style: {overflowY: "auto"}
    },
    e("pre", {
      className: "line-numbers language-json",
    }, e("code", {
      ref: el => this.textInput = el,
    })));
  }
}
