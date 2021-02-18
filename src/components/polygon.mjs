/* eslint-disable react/prop-types */

export default class Polygon extends React.Component {
  render() {

    const {x, y, width, height, r, rx, ry, shape} = this.props;
    const opts = {
      transform: `
        rotate(${r} ${rx} ${ry})
        translate(${x+5}, ${y+5})`.replace(/\s+/g, " ").trim()
    };
    switch (shape) {
      case "arrow-right":
        return e(
          "g",
          opts,
          e("polygon", {
            points: `${width} ${height / 2 - 12} ${width} ${height / 2 + 12} ${width + 18} ${height / 2}`,
            fill: "#268bd2",
          })
        );
    }
  }
}
