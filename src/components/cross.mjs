/* eslint-disable react/prop-types */

export default class Cross extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return e(
      "g", {
      transform: `translate(${this.props.rx}, ${this.props.ry})`
    },
      e("circle", {
        cx: 20,  // 5
        cy: 20,  // 5
        r: 5,
        fill: "var(--base0)"
      }),
      e("rect", {
        width: 2,
        height: 18,
        x: 19,  // 4
        y: 11, // -4
        fill: "var(--base0)"
      }),
      e("rect", {
        width: 18,
        height: 2,
        x: 11,  // -4
        y: 19,  // 4
        fill: "var(--base0)"
      })
    )
  }
}
