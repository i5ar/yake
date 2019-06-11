/* eslint-disable react/prop-types */
const e = React.createElement;

export default class Controller extends React.Component {
  constructor() {
    super();
    this.state = {
      active: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const _text = e(
      "div", {
        style: {
          color: "var(--base03)",
          fontFamily: "var(--monospace)",
        }
      },
      e("div", null,
        e(
          "button", null, "+"
        ),
        e(
          "button", null, "-"
        )
      ),
      e("div", null,
        e(
          "button", null, "←"
        ),
        e(
          "button", null, "↑"
        ),
        e(
          "button", null, "↓"
        ),
        e(
          "button", null, "→"
        )
      ),
      e("div", null,
        e("button", null, "↻")
      )
    );

    const n = new Noty({
      layout: "bottomRight",
      closeWith: ["button"],
      theme: "sunset",
      text: ReactDOMServer.renderToString(_text),
      callbacks: {
        onClose: () => {
          this.setState({
            active: false,
          });
        },
        onShow: () => {
          this.setState({
            active: true,
          });
        }
      }
    });
    n.show();
  }

  render() {
    return e("button", {
      type: "button",
      className: "pure-button",
      onClick: this.handleClick,
      disabled: this.state.active,
    }, "Open controller");
  }
}
