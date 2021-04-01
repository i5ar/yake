/* eslint-disable react/prop-types */

export default class Section extends React.Component {
  constructor() {
    super();
    this.state = {
      isLayouts: true,
      isHousing: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  get width() {
    const {w} = this.props.defaultValues.layouts;
    return this.props.selectedKey !== null ? this.keycap.w || w : w;
  }

  get height() {
    const {h} = this.props.defaultValues.layouts;
    return this.props.selectedKey !== null ? this.keycap.h || h : h;
  }

  get x() {
    const {x} = this.props.defaultValues.layouts;
    return this.props.selectedKey !== null ? this.keycap.x || x : x;
  }

  get y() {
    const {y} = this.props.defaultValues.layouts;
    return this.props.selectedKey !== null ? this.keycap.y || y : y;
  }

  get r() {
    const {r} = this.props.defaultValues.layouts;
    return this.props.selectedKey !== null ? this.keycap.r || r : r;
  }

  get rx() {
    const {rx} = this.props.defaultValues.layouts;
    return this.props.selectedKey !== null ? this.keycap.rx || rx : rx;
  }

  get ry() {
    const {ry} = this.props.defaultValues.layouts;
    return this.props.selectedKey !== null ? this.keycap.ry || ry : ry;
  }

  get label() {
    const {label} = this.props.defaultValues.layouts;
    return this.props.selectedKey !== null ? this.keycap?.label || label : label;
  }

  get c() {
    const {c} = this.props.defaultValues.layouts;
    return this.props.selectedKey !== null ? this.keycap?.c || c : c;
  }

  get t() {
    const {t} = this.props.defaultValues.layouts;
    return this.props.selectedKey !== null ? this.keycap?.t || t : t;
  }

  get widthShape() {
    const {w} = this.props.defaultValues.housing;
    return this.props.selectedCase !== null ? this.shape.w || w : w;
  }

  get heightShape() {
    const {h} = this.props.defaultValues.housing;
    return this.props.selectedCase !== null ? this.shape.h || h : h;
  }

  get xShape() {
    const {x} = this.props.defaultValues.housing;
    return this.props.selectedCase !== null ? this.shape.x || x : x;
  }

  get yShape() {
    const {y} = this.props.defaultValues.housing;
    return this.props.selectedCase !== null ? this.shape.y || y : y;
  }

  get pShape() {
    const {p} = this.props.defaultValues.housing;
    return this.props.selectedCase !== null ? this.shape.p || p : p;
  }

  componentDidUpdate() {
    tippy("#configure label", {
      placement: "top-end",
      animateFill: false,
      theme: "solarized"
    });
    tippy("#house label", {
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
    const {name} = evt.target;
    if (name === "isLayouts" || name === "isHousing") {
      this.setState(s => {
        const stateKeys = Object.keys(s);
        const index = stateKeys.indexOf(name);
        if (index !== -1) stateKeys.splice(index, 1);
        return stateKeys.map(
          key => ({
            [key]: false
          })).reduce(
          (acc, cur) => ({
            ...acc,
            [Object.keys(cur)]: cur[Object.keys(cur)]
          }),
          {
            [name]: !s[name]
          }
        );
      });
    } else {
      this.props.handleClickCallback(evt);
    }
  }

  handleChange(evt) {
    this.props.handleChangeCallback(evt);
  }

  render() {
    const {info, intl, layoutName, selectedKey, selectedCase, housingName} = this.props;
    const {isLayouts, isHousing} = this.state;
    this.keycap = info.layouts?.[layoutName].layout[selectedKey] || {};
    this.shape = info.housing?.[housingName].shape[selectedCase] || {};

    const buttonStyle = {
      backgroundColor: "var(--orange)",
      width: "100%",
      borderRadius: 0
    };
    const liStyle = {
      flexGrow: 1
    };
    return e(Fragment, null,
      e(
        "ul", {
          className: "mode",
          style: {
            display: "flex",
            flexDirection: "row",
            listStyleType: "none",
            margin: 0,
            padding: 0
          }
        },
        e("li", {
          style: liStyle
        },
          e(
            "button", {
              style: buttonStyle,
              type: "button",
              name: "isLayouts",
              className: isLayouts ? "pure-button pure-button-active" : "pure-button",
              onClick: this.handleClick
            }, "Layouts",
          )), e("li", {
            style: liStyle
          },
          e("button", {
            style: buttonStyle,
            type: "button",
            name: "isHousing",
            className: isHousing ? "pure-button pure-button-active" : "pure-button",
            onClick: this.handleClick
          }, "Housing")
        )
      ),
      e("section", {
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
                    id: "x",
                    defaultMessage: "Abscissa",
                  }))
                }, "x:"),
                e("input", {
                  type: "number",
                  step: 0.25,
                  name: "x",
                  value: this.x,
                  onChange: this.handleChange
                })
              ),
              e(
                "div", null,
                e("label", {
                  "data-tippy-content": intl.formatMessage(m({
                    id: "y",
                    defaultMessage: "Ordinate",
                  }))
                }, "y:"),
                e("input", {
                  type: "number",
                  step: 0.25,
                  name: "y",
                  value: this.y,
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
                  value: this.r,
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
                  value: this.rx,
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
                  value: this.ry,
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
                  maxLength: this.width > 1 ? Math.floor(6 * (this.width - 0.25)) : 4,
                  value: this.label,
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
          "div", {id: "house"},
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
                  })),
                }, "width:"),
                e("input", {
                  type: "number",
                  name: "housing-w",
                  value: this.widthShape,
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
                  name: "housing-h",
                  value: this.heightShape,
                  onChange: this.handleChange
                })
              ),
              e(
                "div", null,
                e("label", {
                  "data-tippy-content": intl.formatMessage(m({
                    id: "x",
                    defaultMessage: "Abscissa",
                  }))
                }, "x:"),
                e("input", {
                  type: "number",
                  name: "housing-x",
                  value: this.xShape,
                  onChange: this.handleChange
                })
              ),
              e(
                "div", null,
                e("label", {
                  "data-tippy-content": intl.formatMessage(m({
                    id: "y",
                    defaultMessage: "Ordinate",
                  }))
                }, "y:"),
                e("input", {
                  type: "number",
                  name: "housing-y",
                  value: this.yShape,
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
                  "data-tippy-content": intl.formatMessage(m({
                    id: "p",
                    defaultMessage: "Points",
                  }))
                }, "p:"),
                e("input", {
                  type: "text",
                  name: "housing-p",
                  value: this.pShape,
                  onChange: this.handleChange
                })
              )
            )
          )

        )
      )

    ));
  }
}
