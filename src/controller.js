/* eslint-disable react/prop-types */
const e = React.createElement;

export default class Controller extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  get width() {
    if (this.keycap && this.keycap.w !== undefined) return this.keycap.w;
    if (this.keycap && this.keycap.w === undefined) return "1";
    return "";
  }

  componentDidMount() {
    tippy("label", {
      placement: "top-end",
      animateFill: false,
      theme: "solarized"
    });
  }

  handleClick(evt) {
    this.props.handleClickCallback_(evt);
  }

  handleChange(evt) {
    this.props.handleChangeCallback_(evt);
  }

  render() {
    const {info, layout, active, keydev} = this.props;

    this.keycap = info.layouts ? info.layouts[layout].layout[keydev] : {};

    return e(
      "div",
      {
        className: active ? "controller active" : "controller",
      },

      e("div", null,
        e("button", {
          type: "button",
          className: "pure-button success",
          name: "add",
          onClick: this.handleClick,
        }, "Add keycap"),
        e("button", {
          type: "button",
          className: "pure-button error",
          name: "remove",
          onClick: this.handleClick,
        }, "Remove keycap"),
      ),

      // e(
      //   "form", {
      //     className: "pure-form pure-form-aligned",
      //     onChange: this.handleChange,
      //   },
      //   e(
      //     "fieldset", {
      //       className: "pure-control-group"
      //     },
      //     e(
      //       "div", null,
      //       e("label", {
      //         "data-tippy-content": "layout.length",
      //       }, "Keycaps: "),
      //       e("input", {
      //         type: "number",
      //         name: "keycaps",
      //         value: info.layouts ? info.layouts[layout].layout.length : 0,
      //       })
      //     )
      //   )
      // ),

      e(
        "form",
        {
          className: "pure-form pure-form-aligned",
          onChange: this.handleChange,
        },
        e(
          "fieldset", {
            className: "pure-control-group"
          },
          e(
            "div", null,
            e("label", {
              "data-tippy-content": "x",
            }, "Move abscissa: "),
            e("input", {
              type: "number",
              step: 0.25,
              name: "x",
              value: this.keycap && this.keycap.x !== undefined ? this.keycap.x : "",
            })
          ),
          e(
            "div", null,
            e("label", {
              "data-tippy-content": "y",
            }, "Move ordinate: "),
            e("input", {
              type: "number",
              step: 0.25,
              name: "y",
              value: this.keycap && this.keycap.y !== undefined ? this.keycap.y : "",
            })
          ),
          e(
            "div", null,
            e("label", {
              "data-tippy-content": "w",
            }, "Width: "),
            e("input", {
              type: "number",
              step: 0.25,
              name: "w",
              min: 1,
              value: this.width
            })
          )
        ),
      ),
      e(
        "form", {
          className: "pure-form pure-form-aligned",
          onChange: this.handleChange,
        },
        e(
          "fieldset", {
            className: "pure-control-group"
          },
          e(
            "div", null,
            e("label", {
              "data-tippy-content": "r",
            }, "Rotate: "),
            e("input", {
              type: "number",
              step: 5,
              name: "r",
              value: this.keycap && this.keycap.r !== undefined ? this.keycap.r : "",
            }),
          ),
          e(
            "div", null,
            e("label", {
              "data-tippy-content": "rx",
            }, "Rotate abscissa: "),
            e("input", {
              type: "number",
              step: 0.25,
              name: "rx",
              value: this.keycap && this.keycap.rx !== undefined ? this.keycap.rx : "",
            })
          ),
          e(
            "div", null,
            e("label", {
              "data-tippy-content": "ry",
            }, "Rotate ordinate: "),
            e("input", {
              type: "number",
              step: 0.25,
              name: "ry",
              value: this.keycap && this.keycap.ry !== undefined ? this.keycap.ry : "",
            })
          )
        )
      ),
      e(
        "form", {
          className: "pure-form pure-form-aligned",
          onChange: this.handleChange,
        },
        e(
          "fieldset", {
            className: "pure-control-group"
          },
          e(
            "div", null,
            e("label", {
              "data-tippy-content": "label",
            }, "Label: "),
            e("input", {
              type: "text",
              name: "label",
              maxlength: this.keycap && this.keycap.w !== undefined ? 6 * (this.keycap.w - 0.25) : 4,
              value: this.keycap && this.keycap.label !== undefined ? this.keycap.label : "",
            })
          ),
          e(
            "div", null,
            e("label", {
              "data-tippy-content": "p",
            }, "Points: "),
            e("input", {
              type: "text",
              name: "p",
              value: this.keycap && this.keycap.p !== undefined ? this.keycap.p : "",
            })
          )
        )
      )
    );
  }
}
