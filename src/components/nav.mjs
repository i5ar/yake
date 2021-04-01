/* eslint-disable react/prop-types */

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    const {dataset} = evt.target;
    if (dataset.api) {
      evt.preventDefault();
      this.props.handleClickCallback(evt);
    }
  }

  render() {
    const {hasMenu, hasApi} = this.props;
    const opts = hasMenu ? ["YAKE", "QMK"] : [];

    return e(
      "nav",
      {
        className: "navigation"
      },
      e(
        "div", null,
        e("h1", null,
          e("a", {href: "/"},
            e("span", null, "Y"),
            e("span", null, "A"),
            e("span", null, "K"),
            e("span", null, "E")
          )
        ),
        hasMenu ? e(
          "ul",
          {
            style: {
              padding: "initial",
              listStyleType: "none",
              borderBottom: "1px solid #002b36"
            }
          },
          opts.map((el, i) => e("li", {
            key: i,
            className: hasApi === !!+i ? "selected" : null,
            style: {
              borderTop: "1px solid #002b36"
            }
          }, e("a", {
            style: {
              display: "block",
              padding: "1em"
            },
            href: "#",
            "data-api": i,
            onClick: this.handleClick
          }, el))),
        ) : e(
          "p",
          {
            className: "description"
          }, "Yet Another Keyboard Editor"
        )
      )
    );
  }
}
