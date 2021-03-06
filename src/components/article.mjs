/* eslint-disable react/prop-types */
import Header from "./header.mjs";

import Keycap from "./keycap.mjs";
import ForeignObjects from "./foreignObjects.mjs";
import {
  getSize
} from "../common/size.mjs";

export default class Article extends React.Component {
  constructor() {
    super();
    this.state = {
      designNames: ["keycap", "case"],
      designName: "keycap"
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.handleSubmitCallback(evt);
  }

  handleChange(evt) {
    const {name, value} = evt.target;
    this.setState({
      [name]: value
    });
  }

  handleClick(evt) {
    const {unit} = this.props.defaultValues;
    const client = evt.target.getBoundingClientRect();
    const x = evt.clientX - client.left;
    const y = evt.clientY - client.top;
    console.info(x / unit, y / unit);
  }

  render() {
    const {
      intl,
      info,
      selectedCase,
      selectedKey,
      layoutName,
      housingName,
      defaultValues,
      isPrint,
      hasProfile,
      hasCase
    } = this.props;

    const {
      designName,
      designNames
    } = this.state;

    const defs = e(
      "defs", null,
      // NOTE: Gradient.
      e(
        "linearGradient", {
          id: "GRADIENT"
        },
        e(
          "stop", {
            offset: "0%",
            stopColor: "var(--base03)",
            stopOpacity: "0"
          }
        ),
        e(
          "stop", {
            offset: "40%",
            stopColor: "var(--base03)",
            stopOpacity: "0.1"
          }
        ),
        e(
          "stop", {
            offset: "60%",
            stopColor: "var(--base03)",
            stopOpacity: "0.1"
          }
        ),
        e(
          "stop", {
            offset: "100%",
            stopColor: "var(--base03)",
            stopOpacity: "0"
          }
        )
      ),
      // NOTE: Patterns.
      e("pattern", {
        id: "BOXES",
        width: 10,
        height: 10,
        patternUnits: "userSpaceOnUse"
      }, e("g", {
        fill:'lightgray',
        fillRule: 'evenodd',
        fillOpacity: 1
      }, e("path", {
        d: "M0 0h10L0 10z"
      }
      ))),

      e("pattern", {
        id: "DIAGONALS",
        width: 6,
        height: 6,
        patternUnits: "userSpaceOnUse"
      }, e("g", {
        fill:'lightgray',
        fillRule: 'evenodd',
        fillOpacity: 1
      }, e("path", {
        d: "M5 0h1L0 6V5zM6 5v1H5z"
      }))),

      e("pattern", {
        id: "DOTS",
        width: 10,
        height: 10,
        patternUnits: "userSpaceOnUse"
      }, e("g", {
        fill:'lightgray',
        fillRule: 'evenodd',
        fillOpacity: 1
      }, e("circle", {
        cx:'3',
        cy:'3',
        r:'2'
      }),
      e("circle", {
        cx:'8',
        cy:'8',
        r:'2'
      })))
    );

    // NOTE: Case.
    const {unit, pivot, radius, housing, layouts} = defaultValues;
    const shape_ = info?.housing ? Object.keys(info.housing)[0] : null;
    const shapes = shape_ ? info.housing[shape_]?.shape.map(
      (shape, i) => {
        const color = info.housing?.[shape_].shape[i].c || housing.c;
        if (shape.p) return e("polygon", {
          key: i,
          // TODO: Parse to normalize pivot.
          points: shape.p.map(point => point * unit).join(","),
          fill: isPrint ? "url(#DIAGONALS)" : color,
          stroke: isPrint ? "lightgray" : color,
          strokeWidth: radius * 2,
          strokeLinejoin: "round"
        });
        if (shape.w && shape.h) return e("rect", {
          key: i,
          x: shape.x * unit || 0,
          y: shape.y * unit || 0,
          width: shape.w * unit,
          height: shape.h * unit,
          fill: isPrint ? "url(#DIAGONALS)" : color,
          stroke: isPrint ? "lightgray" : color,
          strokeWidth: radius * 2,
          strokeLinejoin: "round"
        });
      }
    ) : null;

    let [width, height] = Object.keys(info).length !== 0 ? [info.width, info.height] : [0, 0];

    // NOTE: Guess size when `width` and `height` are not present in `info.json`.
    const size = getSize(info, layoutName);
    const [_width, _height] = size || [0, 0];

    width = pivot * 2 + 1 + unit * (width || _width);
    height = pivot * 2 + 1 + unit * (height || _height);

    return e("article", null,
          e("form", {
            id: "remove",
            className: "form pure-form",
            style: {margin: 0},
            onSubmit: this.handleSubmit
          },
          e("fieldset", null,
            e("select", {
              name: "designName",
              style: {borderRadius: 0},
              value: designName,
              onChange: this.handleChange
            }, this.state.designNames.map(
              name => e("option", {key: name}, name)
            )),
            e("input", {
              className: "pure-button",
              style: {
                borderRadius: 0,
                backgroundColor: "var(--red)",
                flexGrow: 1
              },
              type: "submit",
              name: "remove",
              value: "remove"
            })
          )
        ),
        e(
        "div", {
          className: "device",
          style: {
            overflowX: "auto",
            padding: "0.5em 0"
          }
        },
        e(
          "svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width,
            height,
            viewBox: `0 0 ${width} ${height}`,
            onClick: this.handleClick,
            ref: this.props.svgRef
          },
          defs,
          e(
            "g",
            {
              id: "viewport"
            },
            // NOTE: Add case.
            hasCase ? e(
              "g", {
                transform: `translate(${pivot}, ${pivot})`
              },
              shapes
            ) : null,
            // NOTE: Add pivot cross.
            info?.layouts?.[layoutName].layout.map(
              (layout, i) => i === selectedKey && !isPrint ? e("g", {
                key: i,
                transform: `translate(${pivot + (layout.rx * unit || 0)}, ${pivot + (layout.ry * unit || 0)})`
              },
                e("circle", {
                  cx: 0,
                  cy: 0,
                  r: 5,
                  fill: "var(--base0)"
                }),
                e("rect", {
                  width: 2,
                  height: 18,
                  x: -1,
                  y: -9,
                  fill: "var(--base0)"
                }),
                e("rect", {
                  width: 18,
                  height: 2,
                  x: -9,
                  y: -1,
                  fill: "var(--base0)"
                })
              ) : null
            ),
            // NOTE: Add keycaps.
            e(
              "g", {
                transform: `translate(${pivot}, ${pivot})`
              },
              info?.layouts?.[layoutName].layout.map(
                (layout, i) => e(Keycap, {
                  key: i,
                  index: i,
                  unit,
                  radius,
                  layouts,
                  x: unit * layout.x || 0,
                  y: unit * layout.y || 0,
                  w: layout.w,
                  h: layout.h,
                  ks: layout.ks,
                  p: layout.p,
                  c: layout.c,
                  t: layout.t,
                  r: layout.r || 0,
                  rx: unit * layout.rx || 0,
                  ry: unit * layout.ry || 0,
                  label: layout.label,
                  code: "KC_NO",
                  keys: [],
                  selectedKey,
                  isPrint,
                  hasProfile,
                  handleClickCallback: this.props.handleClickCallback,
                  handleKeyDownCallback: this.props.handleKeyDownCallback
                })
              )
            ),
            // NOTE: Add arrows.
            info?.layouts?.[layoutName].layout.map(
              (layout, i) => i === selectedKey ? e(
                "g", {
                  key: i,
                  transform: `translate(${pivot}, ${pivot})`
                },
                e(ForeignObjects, {
                  intl,
                  unit,
                  radius,
                  layout,
                  handleClickCallback: this.props.handleClickCallback,
                  handleChangeCallback: this.props.handleChangeCallback
                })
              ) : null
            )
          )
        )
      ),
      e("form", {
        id: "add",
        className: "form pure-form",
        style: {margin: 0},
        onSubmit: this.handleSubmit
      },
      e("fieldset", null,
        e("select", {
          name: "designName",
          style: {borderRadius: 0},
          value: designName,
          onChange: this.handleChange
        }, this.state.designNames.map(
          name => e("option", {key: name}, name)
        )),
        e("input", {
          type: "submit",
          style: {
            borderRadius: 0,
            backgroundColor: "var(--green)",
            flexGrow: 1
          },
          className: "pure-button",
          name: "add",
          value: "add"
      }))),
      e(Header, {
        info,
        intl,
        designName,
        designNames,
        layoutName,
        housingName,
        selectedKey,
        selectedCase,
        defaultValues,
        handleClickCallback: this.props.handleClickCallback,
        handleChangeCallback: this.props.handleChangeCallback
      })
    );
  }
}
