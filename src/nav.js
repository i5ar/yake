/* eslint-disable react/prop-types */
const e = React.createElement;

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(evt) {
    if (evt.target.id === "api") {
      evt.preventDefault();
      this.props.onClickCallback(evt.target.id, evt.target.dataset.api);
    } else if (evt.target.id === "download") {
      evt.preventDefault();
      const element = document.createElement("a");
      element.setAttribute(
        "href", "data:text/plain;charset=utf-8," + encodeURIComponent(this.props.deviceHtml.innerHTML));
      element.setAttribute("download", "keyboard.svg");
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  }

  handleChange(evt) {
    const {name} = evt.target;
    const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    this.props.onChangeCallback(name, value);
  }

  render() {
    const {api} = this.props;
    const opts = ["TSMK", "QMK"];

    return e(
      "nav",
      {
        className: "navigation",
      },
      e(
        "div", null,
        e(
          "h1",
          {
            style: {
              padding: "8px 1em",
              margin: "8px 0 0 0",
            }
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
            id: "api",
            "data-api": i,
            onClick: evt => this.handleClick(evt),
          }, el))),
        )
      ),
      e(
        "div", null,
        e(
          "form", null,
          e(
            "label", null,
            e("input", {
              name: "profile",
              type: "checkbox",
              checked: this.props.profile,
              onChange: this.handleChange,
            }), "Profile"),
          e(
            "label", null,
            e("input", {
              name: "case_",
              type: "checkbox",
              checked: this.props.case_,
              onChange: this.handleChange,
            }), "Case"),
        ),
        e(
          "div", {
            className: "download"
          },
          e("button", {
            id: "download",
            onClick: evt => this.handleClick(evt),
          }, "DownloadSVG")
        )
      )
    );
  }
}
