/* eslint-disable react/prop-types */
const e = React.createElement;

export default class Joystick extends React.Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // TODO: Open joystick.
    const n = new Noty({
      layout: "bottomRight",
      closeWith: ["button"],
      theme: "sunset",
      text: `
      <button>+</button>
      <button>-</button>
      <br>
      <button>←</button>
      <button>↑</button>
      <button>↓</button>
      <button>→</button>
      <br>
      <button>↻</button>
      `,
    });
    n.show();
  }

  render() {
    return e("button", {
      type: "button",
      className: "pure-button",
      onClick: this.handleClick,
    }, "Open joystick");
  }
}
