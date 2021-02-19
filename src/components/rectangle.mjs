/* eslint-disable react/prop-types */

export default class Rectangle extends React.Component {
  render() {
    return e(
      "rect", {
        className: this.props.className || null,
        x: this.props.x,
        y: this.props.y,
        width: this.props.width,
        height: this.props.height,
        rx: this.props.rx,
        fill: this.props.fill,
        stroke: this.props.stroke,
        strokeWidth: this.props.strokeWidth
      });
  }
}
