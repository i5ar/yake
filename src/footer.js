/* eslint-disable react/prop-types */
const e = React.createElement;

export default class Footer extends React.Component {
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
        className: "far fa-keyboard",
      }),
      " by ",
      e("a", {
        href: "#"
      }, "@i5ar")));
  }
}
