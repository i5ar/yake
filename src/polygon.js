/* eslint-disable react/prop-types */

export default class Polygon extends React.Component {
  render() {
    switch (this.props.shape) {
      case "arrow-right":
        return e(
        "polygon", {
          points: `
          ${this.props.width + 4}
          ${this.props.height / 2 - 12}
          ${this.props.width + 4}
          ${this.props.height / 2 + 12}
          ${this.props.width + 18}
          ${this.props.height / 2}`,
          fill: "lime"
      });
  }}
}
