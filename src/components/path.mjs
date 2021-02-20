/* eslint-disable react/prop-types */

export default class Path extends React.Component {
  render() {
    return e(
      "path", {
        "data-index": this.props.index,
        className: this.props.className || null,
        d: this.props.d,
        fill: this.props.fill,
        stroke: this.props.stroke,
        strokeWidth: this.props.strokeWidth
      });
  }
}
