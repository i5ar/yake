/* eslint-disable react/prop-types */

import {
  config
} from "./common/config.js";

export default class Controller extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  get housingP() {
    if (this.keycap && this.keycap.w !== undefined) return this.keycap.w;
    if (this.keycap && this.keycap.w === undefined) return "1";
    return "";
  }

  get width() {
    if (this.keycap && this.keycap.w !== undefined) return this.keycap.w;
    if (this.keycap && this.keycap.w === undefined) return "1";
    return "";
  }

  get height() {
    if (this.keycap && this.keycap.h !== undefined) return this.keycap.h;
    if (this.keycap && this.keycap.h === undefined) return "1";
    return "";
  }

  get c() {
    if (this.keycap && this.keycap.c !== undefined) return this.keycap.c;
    if (this.keycap && this.keycap.c === undefined) return config.layouts.c;
    return "";
  }

  get t() {
    if (this.keycap && this.keycap.t !== undefined) return this.keycap.t;
    if (this.keycap && this.keycap.t === undefined) return config.layouts.t;
    return "";
  }

  componentDidUpdate() {
    // tippy(".controller label", {
    //   placement: "top-end",
    //   animateFill: false,
    //   theme: "solarized"
    // });
    tippy(".controller div#generate button", {
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
    const {info, layout, state, keydev} = this.props;

    this.keycap = info.layouts ? info.layouts[layout].layout[keydev] : {};

    return e(
      "div", {
        className: "controller",
        style: {
          display: state.layouts || state.housing ? "inherit" : "none"
        }
      },

      e(
        "div", {
          id: "layouts",
          // className: state.layouts ? "slide-in" : "slide-out",
          style: {
            display: state.layouts ? "inherit" : "none"
          }
        }, e(
          "div", null,

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
          //         defaultValue: info.layouts ? info.layouts[layout].layout.length : 0
          //       })
          //     )
          //   )
          // ),

          e(
            "form",
            {
              className: "pure-form pure-form-aligned",
              onChange: this.handleChange
            },
            e(
              "fieldset", {
                className: "pure-control-group"
              },
              e(
                "div", null,
                e("label", {
                  "data-tippy-content": "w"
                }, "Width: "),
                e("input", {
                  type: "number",
                  step: 0.25,
                  name: "w",
                  min: 1,
                  // max: 15,
                  defaultValue: this.width
                })
              ),
              e(
                "div", null,
                e("label", {
                  "data-tippy-content": "h"
                }, "Height: "),
                e("input", {
                  type: "number",
                  step: 1,
                  name: "h",
                  min: 1,
                  // max: 2,
                  defaultValue: this.height
                })
              ),
              e(
                "div", null,
                e("label", {
                  "data-tippy-content": "x"
                }, "Abscissa: "),
                e("input", {
                  type: "number",
                  step: 0.25,
                  name: "x",
                  defaultValue: this.keycap && this.keycap.x !== undefined ? this.keycap.x : ""
                })
              ),
              e(
                "div", null,
                e("label", {
                  "data-tippy-content": "y"
                }, "Ordinate: "),
                e("input", {
                  type: "number",
                  step: 0.25,
                  name: "y",
                  defaultValue: this.keycap && this.keycap.y !== undefined ? this.keycap.y : ""
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
              //     defaultValue: this.keycap && this.keycap.p !== undefined ? this.keycap.p : ""
              //   })
              // )
            )
          ),
          e(
            "form", {
              className: "pure-form pure-form-aligned",
              onChange: this.handleChange
            },
            e(
              "fieldset", {
                className: "pure-control-group"
              },
              e(
                "div", null,
                e("label", {
                  "data-tippy-content": "r"
                }, "Rotation: "),
                e("input", {
                  type: "number",
                  step: 5,
                  name: "r",
                  min: -180,
                  // max: 180,
                  defaultValue: this.keycap && this.keycap.r !== undefined ? this.keycap.r : ""
                })
              ),
              e(
                "div", null,
                e("label", {
                  "data-tippy-content": "rx"
                }, "Abscissa rotat.: "),
                e("input", {
                  type: "number",
                  step: 0.25,
                  name: "rx",
                  defaultValue: this.keycap && this.keycap.rx !== undefined ? this.keycap.rx : ""
                })
              ),
              e(
                "div", null,
                e("label", {
                  "data-tippy-content": "ry"
                }, "Ordinate rotat.: "),
                e("input", {
                  type: "number",
                  step: 0.25,
                  name: "ry",
                  defaultValue: this.keycap && this.keycap.ry !== undefined ? this.keycap.ry : ""
                })
              )
            )
          ),
          e(
            "form", {
              className: "pure-form pure-form-aligned",
              onChange: this.handleChange
            },
            e(
              "fieldset", {
                className: "pure-control-group"
              },
              e(
                "div", null,
                e("label", {
                  "data-tippy-content": "label"
                }, "Label: "),
                e("input", {
                  type: "text",
                  name: "label",
                  maxLength: this.keycap && this.keycap.w !== undefined ? Math.floor(6 * (this.keycap.w - 0.25)) : 4,
                  defaultValue: this.keycap && this.keycap.label !== undefined ? this.keycap.label : ""
                })
              ),
              e(
                "div", null,
                e("label", {
                  "data-tippy-content": "c"
                }, "Ground color: "),
                e("input", {
                  type: "text",  // color
                  name: "c",
                  defaultValue: this.c,
                  style: {
                    backgroundColor: this.c,
                    borderColor: this.c
                  }
                })
              ),
              e(
                "div", null,
                e("label", {
                  "data-tippy-content": "t"
                }, "Label color: "),
                e("input", {
                  type: "text",  // color
                  name: "t",
                  defaultValue: this.t,
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
            "data-tippy-content": "Remove keycap",
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
            "data-tippy-content": "Add 1u keycap",
            name: "add",
            onClick: this.handleClick
          }, e(
            "i", {
              className: "far fa-square",
              style: {pointerEvents: "none"}
            }
          )),
          // TODO: Add homing keycap.
          e("button", {
            type: "button",
            className: "pure-button success",
            "data-tippy-content": "TODO: Add homing keycap",
            name: "add-homing",
            onClick: this.handleClick
          }, e(
            "i", {
              className: "far fa-minus-square",
              style: {pointerEvents: "none"}
            }
          )),
          e("button", {
            type: "button",
            className: "pure-button success",
            "data-tippy-content": "Add ISO keycap",
            name: "add-iso",
            onClick: this.handleClick
          }, e(
            "i", {
              className: "far fa-folder",
              style: {
                pointerEvents: "none",
                transform: "scaleY(-1) rotate(270deg)"
              }
            }
          )),
          // TODO: Add big-ass keycap
          e("button", {
            type: "button",
            className: "pure-button success",
            "data-tippy-content": "TODO: Add big-ass keycap",
            name: "add-ass",
            onClick: this.handleClick
          }, e(
            "i", {
              className: "far fa-folder",
              style: {
                pointerEvents: "none",
                transform: "rotate(270deg)"
              }
            }
          ))
        )
      ),

      e(
        "div", {
          id: "housing",
          // className: state.housing ? "slide-in" : "slide-out",
          style: {
            display: state.housing ? "inherit" : "none"
          }
        }, e(
          "div", null,

          e(
            "form",
            {
              className: "pure-form pure-form-aligned",
              onChange: this.handleChange
            },
            e(
              "fieldset", {
                className: "pure-control-group"
              },
              e(
                "div", null,
                e("label", {
                  "data-tippy-content": "w"
                }, "Width: "),
                e("input", {
                  type: "number",
                  name: "housing-w",
                  defaultValue: ""
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
                  defaultValue: ""
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
                  defaultValue: ""
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
                  defaultValue: ""
                })
              )
            )
          ),

          e(
            "form", {
              className: "pure-form pure-form-aligned",
              onChange: this.handleChange
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
                  defaultValue: ""
                })
              )
            )
          )

        )
      )

    );
  }
}
