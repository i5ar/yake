/* eslint-disable react/prop-types */

export default class Path extends React.Component {
  render() {
    return e(
      "path", {
        className: this.props.className || null,
        d: this.props.d,
        fill: this.props.fill,
        stroke: this.props.stroke
      });
  }
}
