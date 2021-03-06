/* eslint-disable react/prop-types */

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = null;
    this.editor;

    this.updateInfo = this.updateInfo.bind(this);
  }

  updateInfo() {
    // NOTE: Run only with user change.
    if (this.editor.curOp && this.editor.curOp.command.name) {
      this.props.handleAceCallback(this.editor);
    }
  }

  componentDidMount() {
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/solarized_light");
    this.editor.setFontSize(18);
    this.editor.session.setMode("ace/mode/json");
    this.editor.session.on("change", this.updateInfo);
  }

  componentDidUpdate() {
    const value = this.editor.session.getValue();
    const prevInfo = value ? JSON.parse(value, null, 4) : "";
    const cursor = this.editor.getCursorPosition();
    if (this.props.info !== prevInfo) {
      // NOTE: Update text and move cursor to the start.
      this.editor.setValue(JSON.stringify(this.props.info, null, 4), -1);
      this.editor.selection.moveTo(cursor.row, cursor.column);
    }
  }

  render() {
    return e("div", {
        id: "editor",
        style: {
          minHeight: "16em",
          height: "100%",
          flexGrow: 1
        },
        ref: el => this.textInput = el
      });
  }
}
