/* eslint-disable react/prop-types */
const e = React.createElement;

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(name, evt) {
    evt.preventDefault();
    this.props.onClickCallback(name, evt.target.id);
  }

  render() {
    const {api} = this.props;
    const opts = ["My keyboards", "QMK"];

    return e(
      "nav",
      {
        style: {
          backgroundColor: "#073642",
          color: "#eee8d5",
          display: "flex",
          flexDirection: "column",
          fontFamily: "monospace"
        }
      },
      e(
        "h1",
        {
          style: {
            padding: "8px 1em",
            margin: "8px 8px 0 0",
            cursor: "pointer",
          },
          onClick: evt => this.handleClick("gradient", evt),
        }, "YAKE"
      ),
      e(
        "ul",
        {
          style: {
            padding: "initial",
            listStyleType: "none",
            borderBottom: "1px solid #002b36"
          }
        },
        opts.map((el, i) => e("li", {
          className: api === !!+i && "selected",
          style: {
            borderTop: "1px solid #002b36",
          },
        }, e("a", {
          style: {
            display: "block",
            padding: "1em",
          },
          href: "#",
          id: i,
          onClick: evt => this.handleClick("api", evt),
        }, el))),
      )
    );
  }
}
