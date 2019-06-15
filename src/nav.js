/* eslint-disable react/prop-types */
const e = React.createElement;

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.about = new Noty({
      layout: "bottom",
      theme: "solarized",
      type: "info",
      text: `
      YAKE (Yet Another Keyboard Editor) is a simple keyboard designer based on QMK.
      `,
    });

    this.policy = new Noty({
      layout: "bottom",
      theme: "solarized",
      type: "info",
      text: `
      This application set cookies to improve usability, that's all.
      `,
    });
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
    } else if (evt.target.id === "about") {
      evt.preventDefault();
      this.about.show();
    } else if (evt.target.id === "policy") {
      evt.preventDefault();
      this.policy.show();
    }
  }

  handleChange(evt) {
    const {name} = evt.target;
    const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    this.props.onChangeCallback(name, value);
  }

  render() {
    const {api} = this.props;
    const opts = ["YAKE", "QMK"];

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
            onClick: this.handleClick,
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
            className: "pure-button",
            onClick: this.handleClick,
          }, "Download SVG")
        ),
        e(
          "div", {
            className: "more",
          },
          e("a", {
            href: "#",
            id: "about",
            onClick: this.handleClick,
          }, "About"),
          e("span", null, " · "),
          e("a", {
            href: "#",
            id: "policy",
            onClick: this.handleClick,
          }, "Policy"),
        )
      )
    );
  }
}
