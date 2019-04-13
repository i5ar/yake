/* eslint-disable react/prop-types */
const e = React.createElement;

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
      });
  }
}
