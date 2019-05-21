/* eslint-disable react/prop-types */
const e = React.createElement;

export default class Footer extends React.Component {
  handleClick(evt) {
    evt.preventDefault();
    const element = document.createElement("a");
    element.setAttribute(
      "href", "data:text/plain;charset=utf-8," + encodeURIComponent(this.props.deviceHtml.innerHTML));
    element.setAttribute("download", "keyboard.svg");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  render() {
    return e("footer", {
      className: "footer pure-form",
      style: {
        color: "#eee8d5",
        textAlign: "center"
      }
    },
    e("p", null,
      "Made with ",
      e("i", {
        style: {
          cursor: "pointer"
        },
        className: "far fa-keyboard",
        onClick: evt => this.handleClick(evt),
      }),
      " by ",
      e("a", {
        href: "#"
      }, "@i5ar")));
  }
}
