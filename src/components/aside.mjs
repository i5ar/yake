/* eslint-disable react/prop-types */

export default class Aside extends React.Component {
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
      const {id} = evt.target;
      if (id === "download") {
        evt.preventDefault();
        const element = document.createElement("a");
        element.setAttribute(
          "href", "data:text/plain;charset=utf-8," + encodeURIComponent(this.props.svgHtml.outerHTML));
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
      return e("aside", null,
          e(
            "form", {className: "display"},
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
        
      );
    }
}
