/* eslint-disable react/prop-types */

export default class Section extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  get width() {
    return this.keycap ? this.keycap.w || "1" : this.props.defaultValues.layouts.w;
  }

  get height() {
    return this.keycap ? this.keycap.h || "1" : this.props.defaultValues.layouts.h;
  }

  get c() {
    return this.keycap?.c || this.props.defaultValues.layouts.c;
  }

  get t() {
    return this.keycap?.t || this.props.defaultValues.layouts.t;
  }

  componentDidUpdate() {
    tippy("#configure label", {
      placement: "top-end",
      animateFill: false,
      theme: "solarized"
    });
    tippy("#generate button", {
      placement: "top-center",
      animateFill: false,
      theme: "solarized"
    });
  }

  handleClick(evt) {
    this.props.handleClickCallback(evt);
  }

  handleChange(evt) {
    this.props.handleChangeCallback(evt);
  }

  render() {
    const {info, intl, layoutName, selectedKey, isLayouts, isHousing} = this.props;
    this.keycap = info.layouts ? info.layouts[layoutName].layout[selectedKey] : {};

    return e(
      "section", {
        className: "section",
        style: {
          display: isLayouts || isHousing ? "inherit" : "none"
        }
      },

      e(
        "div", {
          id: "layouts",
          // className: isLayouts ? "slide-in" : "slide-out",
          style: {
            display: isLayouts ? "inherit" : "none"
          }
        }, e(
          "div", {id: "configure"},

          // e(
          //   "form", {
          //     className: "pure-form pure-form-aligned",
          //     onChange: this.handleChange
          //   },
          //   e(
          //     "fieldset", {
          //       className: "pure-control-group"
          //     },
          //     e(
          //       "div", null,
          //       e("label", {
          //         "data-tippy-content": "layout.length"
          //       }, "Keycaps: "),
          //       e("input", {
          //         type: "number",
          //         name: "keycaps",
          //         defaultValue: info.layouts ? info.layouts[layoutName].layout.length : 0
          //       })
          //     )
          //   )
          // ),

          e(
            "form",
            {
              className: "pure-form pure-form-aligned",
            },
            e(
              "fieldset", {
                className: "pure-control-group"
              },
              e(
                "div", null,
                e("label", {
                  "data-tippy-content": intl.formatMessage(m({
                    id: "width",
                    defaultMessage: "Width",
                  }))
                }, "width:"),
                e("input", {
                  type: "number",
                  step: 0.25,
                  name: "w",
                  min: 1,
                  value: this.width,
                  onChange: this.handleChange
                })
              ),
              e(
                "div", null,
                e("label", {
                  "data-tippy-content": intl.formatMessage(m({
                    id: "height",
                    defaultMessage: "Height",
                  }))
                }, "height:"),
                e("input", {
                  type: "number",
                  step: 1,
                  name: "h",
                  min: 1,
                  // max: 2,
                  value: this.height,
                  onChange: this.handleChange
                })
              ),
              e(
                "div", null,
                e("label", {
                  "data-tippy-content": intl.formatMessage(m({
                    id: "abscissa",
                    defaultMessage: "Abscissa",
                  }))
                }, "x:"),
                e("input", {
                  type: "number",
                  step: 0.25,
                  name: "x",
                  value: this.keycap?.x !== undefined ? this.keycap.x : this.props.defaultValues.layouts.x,
                  onChange: this.handleChange
                })
              ),
              e(
                "div", null,
                e("label", {
                  "data-tippy-content": intl.formatMessage(m({
                    id: "ordinate",
                    defaultMessage: "Ordinate",
                  }))
                }, "y:"),
                e("input", {
                  type: "number",
                  step: 0.25,
                  name: "y",
                  value: this.keycap?.y !== undefined ? this.keycap.y : this.props.defaultValues.layouts.y,
                  onChange: this.handleChange
                })
              )
              // e(
              //   "div", null,
              //   e("label", {
              //     "data-tippy-content": "p"
              //   }, "Points: "),
              //   e("input", {
              //     type: "text",
              //     name: "p",
              //     value: this.keycap && this.keycap.p !== undefined ? this.keycap.p : "",
              //     onChange: this.handleChange
              //   })
              // )
            )
          ),
          e(
            "form", {
              className: "pure-form pure-form-aligned",
            },
            e(
              "fieldset", {
                className: "pure-control-group"
              },
              e(
                "div", null,
                e("label", {
                  "data-tippy-content": intl.formatMessage(m({
                    id: "r",
                    defaultMessage: "Rotation",
                  }))
                }, "r:"),
                e("input", {
                  type: "number",
                  step: 5,
                  name: "r",
                  min: -180,
                  // max: 180,
                  value: this.keycap?.r !== undefined ? this.keycap.r : this.props.defaultValues.layouts.r,
                  onChange: this.handleChange
                })
              ),
              e(
                "div", null,
                e("label", {
                  "data-tippy-content": intl.formatMessage(m({
                    id: "rx",
                    defaultMessage: "Abscissa rotat.",
                  }))
                }, "rx:"),
                e("input", {
                  type: "number",
                  step: 0.25,
                  name: "rx",
                  value: this.keycap?.rx !== undefined ? this.keycap.rx : this.props.defaultValues.layouts.rx,
                  onChange: this.handleChange
                })
              ),
              e(
                "div", null,
                e("label", {
                  "data-tippy-content": intl.formatMessage(m({
                    id: "ry",
                    defaultMessage: "Ordinate rotat.",
                  }))
                }, "ry:"),
                e("input", {
                  type: "number",
                  step: 0.25,
                  name: "ry",
                  value: this.keycap?.ry !== undefined ? this.keycap.ry : this.props.defaultValues.layouts.ry,
                  onChange: this.handleChange
                })
              )
            )
          ),
          e(
            "form", {
              className: "pure-form pure-form-aligned",
              // onChange: this.handleChange
            },
            e(
              "fieldset", {
                className: "pure-control-group"
              },
              e(
                "div", null,
                e("label", {
                  "data-tippy-content": intl.formatMessage(m({
                    id: "label",
                    defaultMessage: "Label",
                  }))
                }, "label:"),
                e("input", {
                  type: "text",
                  name: "label",
                  maxLength: this.keycap?.w !== undefined ? Math.floor(6 * (this.keycap.w - 0.25)) : 4,
                  value: this.keycap?.label !== undefined ? this.keycap.label : "",
                  onChange: this.handleChange
                })
              ),
              e(
                "div", null,
                e("label", {
                  "data-tippy-content": intl.formatMessage(m({
                    id: "c",
                    defaultMessage: "Ground color",
                  }))
                }, "c:"),
                e("input", {
                  type: "text",  // color
                  name: "c",
                  value: this.c,
                  onChange: this.handleChange,
                  style: {
                    backgroundColor: this.c,
                    borderColor: this.c
                  }
                })
              ),
              e(
                "div", null,
                e("label", {
                  "data-tippy-content": intl.formatMessage(m({
                    id: "t",
                    defaultMessage: "Label color",
                  }))
                }, "t:"),
                e("input", {
                  type: "text",  // color
                  name: "t",
                  value: this.t,
                  onChange: this.handleChange,
                  style: {
                    backgroundColor: this.t,
                    borderColor: this.t
                  }
                })
              )
            )
          )
        ),

        e(
          "div", {
            id: "generate"
          },
          e("button", {
            type: "button",
            className: "pure-button error",
            "data-tippy-content": intl.formatMessage(m({
              id: "removeKeycap",
              defaultMessage: "Remove keycap",
            })),
            name: "remove",
            onClick: this.handleClick
          }, e(
            "i", {
              className: "far fa-times-circle",
              style: {pointerEvents: "none"}
            }
          )),
          e("button", {
            type: "button",
            className: "pure-button success",
            "data-tippy-content": intl.formatMessage(m({
              id: "addKeycap",
              defaultMessage: "Add keycap",
            })),
            name: "add",
            onClick: this.handleClick
          }, e(
            "i", {
              className: "far fa-square",
              style: {pointerEvents: "none"}
            }
          )),
          // TODO: Add keycaps.
          // e("button", {
          //   type: "button",
          //   className: "pure-button success",
          //   "data-tippy-content": "TODO: Add homing keycap",
          //   name: "add-homing",
          //   onClick: this.handleClick
          // }, e(
          //   "i", {
          //     className: "far fa-minus-square",
          //     style: {pointerEvents: "none"}
          //   }
          // )),
          // e("button", {
          //   type: "button",
          //   className: "pure-button success",
          //   "data-tippy-content": "Add ISO keycap",
          //   name: "add-iso",
          //   onClick: this.handleClick
          // }, e(
          //   "i", {
          //     className: "far fa-folder",
          //     style: {
          //       pointerEvents: "none",
          //       transform: "scaleY(-1) rotate(270deg)"
          //     }
          //   }
          // )),
          // // TODO: Add big-ass keycap
          // e("button", {
          //   type: "button",
          //   className: "pure-button success",
          //   "data-tippy-content": "TODO: Add big-ass keycap",
          //   name: "add-bigass",
          //   onClick: this.handleClick
          // }, e(
          //   "i", {
          //     className: "far fa-folder",
          //     style: {
          //       pointerEvents: "none",
          //       transform: "rotate(270deg)"
          //     }
          //   }
          // ))
        )
      ),

      e(
        "div", {
          id: "housing",
          // className: isHousing ? "slide-in" : "slide-out",
          style: {
            display: isHousing ? "inherit" : "none"
          }
        }, e(
          "div", null,

          e(
            "form",
            {
              className: "pure-form pure-form-aligned",
            },
            e(
              "fieldset", {
                className: "pure-control-group"
              },
              e(
                "div", null,
                e("label", {
                  "data-tippy-content": "w",
                }, "Width: "),
                e("input", {
                  type: "number",
                  name: "housing-w",
                  value: "",
                  onChange: this.handleChange
                })
              ),
              e(
                "div", null,
                e("label", {
                  "data-tippy-content": "h"
                }, "Height: "),
                e("input", {
                  type: "number",
                  name: "housing-h",
                  value: "",
                  onChange: this.handleChange
                })
              ),
              e(
                "div", null,
                e("label", {
                  "data-tippy-content": "x"
                }, "Abscissa: "),
                e("input", {
                  type: "number",
                  name: "housing-x",
                  value: "",
                  onChange: this.handleChange
                })
              ),
              e(
                "div", null,
                e("label", {
                  "data-tippy-content": "y"
                }, "Ordinate: "),
                e("input", {
                  type: "text",
                  name: "housing-y",
                  value: "",
                  onChange: this.handleChange
                })
              )
            )
          ),

          e(
            "form", {
              className: "pure-form pure-form-aligned",
            },
            e(
              "fieldset", {
                className: "pure-control-group"
              },
              e(
                "div", null,
                e("label", {
                  "data-tippy-content": "p"
                }, "Points: "),
                e("input", {
                  type: "text",
                  name: "housing-p",
                  value: "",
                  onChange: this.handleChange
                })
              )
            )
          )

        )
      )

    );
  }
}
