/* eslint-disable react/prop-types */
const e = React.createElement;

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = null;
  }

  componentDidUpdate() {
    this.handleAce();
  }

  handleAce() {
    const editor = ace.edit("editor");
    editor.getSession().setMode("ace/mode/json");
    editor.setTheme("ace/theme/solarized_light");
    editor.setFontSize(18);
    if (this.textInput) {
      // NOTE: Update text and move cursor to the start.
      editor.setValue(this.props.code, -1);
    }
  }

  render() {
    return e("div", {
      style: {
        overflowY: "auto",
        minHeight: "16em",
        height: "100%",
      }
    },
    e("div", {
      id: "editor",
      style: {
        height: "100%",
      },
      ref: el => this.textInput = el,
    }));
  }
}
