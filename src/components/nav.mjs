/* eslint-disable react/prop-types */

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      hasPolicy: false,
      hasAbout: false
    };

    const {intl} = this.props;

    this.about = new Noty({
      layout: "bottom",
      theme: "solarized",
      type: "info",
      text: intl.formatMessage(m({
        id: "about",
        defaultMessage: "YAKE (Yet Another Keyboard Editor) is a simple keyboard designer based on QMK.",
      })),
      callbacks: {
        onShow: () => {
          this.setState(s => ({
            hasAbout: !s.hasAbout
          }))
        },
        onClose: () => {
          this.setState(s => ({
            hasAbout: !s.hasAbout
          }))
        },
      }
    });

    this.policy = new Noty({
      layout: "bottom",
      theme: "solarized",
      type: "info",
      text: intl.formatMessage(m({
        id: "policy",
        defaultMessage: "This application set cookies to improve usability, that's all.",
      })),
      callbacks: {
        onShow: () => {
          this.setState(s => ({
            hasPolicy: !s.hasPolicy
          }))
        },
        onClose: () => {
          this.setState(s => ({
            hasPolicy: !s.hasPolicy
          }))
        },
      }
    });
  }

  handleClick(evt) {
    const {hasPolicy, hasAbout} = this.state;
    const {id, dataset} = evt.target;
    if (dataset.api) {
      evt.preventDefault();
      this.props.handleClickCallback(evt);
    } else if (id === "download") {
      evt.preventDefault();
      const element = document.createElement("a");
      element.setAttribute(
        "href", "data:text/plain;charset=utf-8," + encodeURIComponent(this.props.deviceHtml.innerHTML));
      element.setAttribute("download", "keyboard.svg");
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } else if (id === "about" && !hasAbout) {
      evt.preventDefault();
      this.about.show();
    } else if (id === "policy" && !hasPolicy) {
      evt.preventDefault();
      this.policy.show();
    }
  }

  handleChange(evt) {
    this.props.handleChangeCallback(evt);
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
      ),
      e(
        "div", null,
        e(
          "form", null,
          e(
            "fieldset", null,
            e("legend", null, "Display"),
            e(
              "label", null,
              e("input", {
                name: "isPrint",
                type: "checkbox",
                checked: this.props.isPrint,
                onChange: this.handleChange
              }), "Print"),
            e(
              "label", null,
              e("input", {
                name: "hasProfile",
                type: "checkbox",
                checked: this.props.hasProfile,
                onChange: this.handleChange
              }), "Profile"),
            e(
              "label", null,
              e("input", {
                name: "hasCase",
                type: "checkbox",
                checked: this.props.hasCase,
                onChange: this.handleChange
              }), "Case")
          )
        ),
        e(
          "div", {
            className: "download"
          },
          e("button", {
            id: "download",
            className: "pure-button",
            onClick: this.handleClick
          }, "Download SVG")
        ),
        e(
          "div", {
            className: "more"
          },
          e("a", {
            href: "#",
            id: "about",
            onClick: this.handleClick
          }, "About"),
          e("span", null, " · "),
          e("a", {
            href: "#",
            id: "policy",
            onClick: this.handleClick
          }, "Policy"),
        )
      )
    );
  }
}
