/* eslint-disable react/prop-types */
import Controller from "./controller.js";

const e = React.createElement;

export default class Button extends React.Component {
  constructor() {
    super();
    this.state = {
      active: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const n = new Noty({
      layout: "bottom",
      closeWith: ["button"],
      theme: "solarized",
      type: "info",
      text: ReactDOMServer.renderToString(e(Controller)),
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
    return e("div", {
      className: "controller",
    }, e(
      "button", {
        type: "button",
        className: "pure-button",
        onClick: this.handleClick,
        disabled: this.state.active,
      }, "Open controller"));
  }
}
