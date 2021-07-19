/* eslint-disable react/prop-types */

export default class Header extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  handleChange(evt) {
    this.props.handleChangeCallback(evt);
  }

  /**
   * The name (evt.target.name) can be either "layouts", "case" or more.
   * @param {string} evt
   */
  handleClick(evt) {
    this.props.handleClickCallback(evt);
  }

  render() {
    const {
      info,
      intl,
      layoutName,
      selectedKey,
      selectedCase,
      housingName,
      designName
    } = this.props;
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

    return e(
      "header", null,
          e("div", {
            className: "control",
            style: {
              display: "inherit"
            }
          }, e("div", {
              id: "layouts",
              style: {
                display: designName === "keycap" ? "inherit" : "none"
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
          ),
          e(
            "div", {
              id: "housing",
              style: {
                display: designName === "case" ? "inherit" : "none"
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
        )
      );
  }
}
