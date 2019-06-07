/* eslint-disable react/prop-types */
const e = React.createElement;

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = null;
    this.editor;
  }

  componentDidMount() {
    this.editor = ace.edit("editor");
  }

  componentDidUpdate() {
    const {info} = this.props;
    const {row, column} = this.editor.getCursorPosition();
    this.editor.getSession().setMode("ace/mode/json");
    this.editor.getSession().on("change", (x, y) => this.updateAce(x, y));
    this.editor.setTheme("ace/theme/solarized_light");
    this.editor.setFontSize(18);
    // NOTE: Update text and move cursor to the start.
    this.editor.setValue(JSON.stringify(info, null, 4), -1);
    // NOTE: Move cursor to the previous position.
    this.editor.gotoLine(row + 1, column);
  }

  updateAce(x, y) {
    const code = this.editor.getSession().getValue();
    this.props.handleChangeCodeCallback(code, x, y);
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
