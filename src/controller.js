/* eslint-disable react/prop-types */
const e = React.createElement;

export default class Controller extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(evt) {
    this.props.handleClickCallback_(evt);
  }

  handleChange(evt) {
    this.props.handleChangeCallback_(evt);
  }

  render() {
    const {info, layout, active, keydev} = this.props;
    const selectedKeycap = info.layouts ? info.layouts[layout].layout[keydev] : {};


    return e(
      "div",
      {
        className: active ? "controller active" : "controller",
      },
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
            e("label", null, "Keycaps: "),
            e("input", {
              type: "number",
              name: "keycaps",
              value: info.layouts ? info.layouts[layout].layout.length : 0,
            })
          )
        )
      ),
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
            e("label", null, "Move abscissa: "),
            e("input", {
              type: "number",
              step: 0.25,
              name: "x",
              value: selectedKeycap && selectedKeycap.x !== undefined ? selectedKeycap.x : "",
            })
          ),
          e(
            "div", null,
            e("label", null, "Move ordinate: "),
            e("input", {
              type: "number",
              step: 0.25,
              name: "y",
              value: selectedKeycap && selectedKeycap.y !== undefined ? selectedKeycap.y : "",
            })
          ),
          e(
            "div", null,
            e("label", null, "Rotate: "),
            e("input", {
              type: "number",
              step: 5,
              name: "r",
              value: selectedKeycap && selectedKeycap.r !== undefined ? selectedKeycap.r : "",
            }),
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
            e("label", null, "Rotate abscissa: "),

            e("input", {
              type: "number",
              step: 0.25,
              name: "rx",
              value: selectedKeycap && selectedKeycap.rx !== undefined ? selectedKeycap.rx : "",
            })
          ),
          e(
            "div", null,
            e("label", null, "Rotate ordinate: "),

            e("input", {
              type: "number",
              step: 0.25,
              name: "ry",
              value: selectedKeycap && selectedKeycap.ry !== undefined ? selectedKeycap.ry : "",
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
            e("label", null, "Label: "),
            e("input", {
              style: {
                width: "12em"
              },
              type: "text",
              name: "label",
              maxlength: selectedKeycap && selectedKeycap.w !== undefined ? 6 * (selectedKeycap.w - 0.25) : 4,
              value: selectedKeycap && selectedKeycap.label !== undefined ? selectedKeycap.label : "",
            })
          ),
          e(
            "div", null,
            e("label", null, "Points (ISO): "),
            e("input", {
              style: {
                width: "12em"
              },
              type: "text",
              name: "p",
              value: selectedKeycap && selectedKeycap.p !== undefined ? selectedKeycap.p : "",
            })
          )
        )
      )
    );
  }
}
