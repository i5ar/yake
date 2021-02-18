import Dropdown from "./dropdown.js";
import Device from "./device.js";
import Form from "./form.js";
import Nav from "./nav.js";
import Footer from "./footer.js";
import Editor from "./editor.js";
import Button from "./button.js";
import {
  fetchKeyboard,
  fetchKeyboards
} from "./common/service.js";
import {
  protips
} from "./data/protips.js";
import debounce from "./common/debounce.js";

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDevel: true,
      hasApi: false,
      keyboards: [],
      info: {},
      keyboard: "",
      layout: "",
      isInitial: true,
      isCustom: false,
      isPrint: false,
      hasProfile: true,
      hasCase: true,
      selectedKey: null,
      defaultValues: {
        u: 54,
        layouts: {
          label: "",
          w: 1,
          h: 1,
          r: 0,
          rx: 0,
          ry: 0,
          c: "#fdf6e3",
          t: "#d33682"
        },
        housing: {
          color: "#93a1a1"
        }
      }

      // TODO: Add features.
      // keycap color "c" and legend color "t"
    };

    this.protip;

    this.deviceInput = null;
    this.selectElement = null;
    this.formElement = null;

    this.handleChangeCallback = this.handleChangeCallback.bind(this);
    this.handleChangeCallback_ = this.handleChangeCallback_.bind(this);
    this.handleHashCallback = this.handleHashCallback.bind(this);
    this.handleClickCallback = this.handleClickCallback.bind(this);
    this.handleClickCallback_ = this.handleClickCallback_.bind(this);
    this.handleKeyDownCallback = this.handleKeyDownCallback.bind(this);
    this.handleAceCallback = debounce(this.handleAceCallback.bind(this), 1000);
  }

  componentDidMount() {
    const spinner = document.querySelector("#spinner");
    spinner.parentNode.removeChild(spinner);

    const makeProtip = (protip) => new Noty({
      timeout: 4000,
      layout: "bottomRight",
      theme: "solarized",
      text: `
      <h3>Protip</h3>
      <p>${protip}</p>`
    });
    if (document.cookie.includes("protip")) {
      const match = "protip=";
      const matchIndex = document.cookie.indexOf(match);
      const protipIndex = parseInt(document.cookie[matchIndex + match.length], 10);
      if (protipIndex < protips.length - 1) {
        this.protip = makeProtip(protips[protipIndex + 1]);
        this.protip.show();
        document.cookie = `protip=${protipIndex + 1}`;
      }
    } else {
      this.protip = makeProtip(protips[0]);
      this.protip.show();
      document.cookie = "protip=0";
    }
  }

  handleHashCallback(keyboards, keyboard, info) {
    this.setState(s => ({
      isInitial: false,
      keyboards,
      info: s.hasApi ? info.keyboards[keyboard] : info,
      keyboard,
      layout: s.hasApi ? s.layout || Object.keys(
        info.keyboards[keyboard].layouts)[0] : Object.keys(
          info.layouts)[0]
    }));
  }

  handleChangeCallback(name, value) {
    if (name === "keyboard") {
      const {hasApi} = this.state;
      const keyboard = value;
      fetchKeyboard(hasApi, keyboard).then(info => {
        this.setState(s => ({
          info: s.hasApi ? info.keyboards[keyboard] : info,
          keyboard,
          layout: s.hasApi ? Object.keys(
            info.keyboards[keyboard].layouts)[0] : Object.keys(
              info.layouts)[0],
          isCustom: false
        }));
        if (this.selectElement) this.selectElement.focus();
        if (this.formElement) this.formElement.reset();
      });
    } else if (name === "info") {
      const reader = new FileReader();
      reader.readAsText(value);
      reader.onload = evt => {
        const info = JSON.parse(evt.target.result);
        this.setState({
          info,
          keyboard: info.keyboard_name.toLowerCase(),
          layout: Object.keys(info.layouts)[0],
          isCustom: true
        });
      };
    } else {
      this.setState({
        [name]: value
      });
    }
  }

  handleChangeCallback_(evt) {
    const {name, value} = evt.target;

    // if (name === "keycaps") {
    //   this.setState(s => {
    //     if (value < s.info.layouts[this.state.layout].layout.length) {
    //       return {
    //         info: {
    //           ...s.info,
    //           layouts: {
    //             [this.state.layout]: {
    //               layout: s.info.layouts[this.state.layout].layout.filter((l, i) => {
    //                 return i < s.info.layouts[this.state.layout].layout.length - 1;
    //               })
    //             }
    //           }
    //         }
    //       };
    //     }
    //     return {
    //       info: {
    //         ...s.info,
    //         layouts: {
    //           [this.state.layout]: {
    //             layout: [
    //               ...s.info.layouts[this.state.layout].layout,
    //               {
    //                 w: 1,
    //                 x: 0,
    //                 y: 0,
    //                 label: ""
    //               }
    //             ]
    //           }
    //         }
    //       }
    //     };
    //   });
    // }

    if (name === "x") {
      this.setState(s => ({
        info: {
          ...s.info,
          layouts: {
            ...s.info.layouts,
            [s.layout]: {
              layout: s.info.layouts[s.layout].layout.map((l, i) => {
                if (i === s.selectedKey) return {...l, x: parseFloat(value)};
                return l;
              })
            }
          }
        }
      }));
    } else if (name === "y") {
      this.setState(s => ({
        info: {
          ...s.info,
          layouts: {
            ...s.info.layouts,
            [s.layout]: {
              layout: s.info.layouts[s.layout].layout.map((l, i) => {
                if (i === s.selectedKey) return {...l, y: parseFloat(value)};
                return l;
              })
            }
          }
        }
      }));
    } else if (name === "w") {
      this.setState(s => ({
        info: {
          ...s.info,
          layouts: {
            ...s.info.layouts,
            [s.layout]: {
              layout: s.info.layouts[s.layout].layout.map((l, i) => {
                if (i === s.selectedKey) return {...l, w: parseFloat(value)};
                return l;
              })
            }
          }
        }
      }));
    } else if (name === "h") {
      this.setState(s => ({
        info: {
          ...s.info,
          layouts: {
            ...s.info.layouts,
            [s.layout]: {
              layout: s.info.layouts[s.layout].layout.map((l, i) => {
                if (i === s.selectedKey) return {...l, h: parseInt(value, 10)};
                return l;
              })
            }
          }
        }
      }));
    } else if (name === "r") {
      this.setState(s => ({
        info: {
          ...s.info,
          layouts: {
            ...s.info.layouts,
            [s.layout]: {
              layout: s.info.layouts[s.layout].layout.map((l, i) => {
                if (i === s.selectedKey) return {...l, r: parseInt(value, 10)};
                return l;
              })
            }
          }
        }
      }));
    } else if (name === "rx") {
      this.setState(s => ({
        info: {
          ...s.info,
          layouts: {
            ...s.info.layouts,
            [s.layout]: {
              layout: s.info.layouts[s.layout].layout.map((l, i) => {
                if (i === s.selectedKey) return {...l, rx: parseFloat(value)};
                return l;
              })
            }
          }
        }
      }));
    } else if (name === "ry") {
      this.setState(s => ({
        info: {
          ...s.info,
          layouts: {
            ...s.info.layouts,
            [s.layout]: {
              layout: s.info.layouts[s.layout].layout.map((l, i) => {
                if (i === s.selectedKey) return {...l, ry: parseFloat(value)};
                return l;
              })
            }
          }
        }
      }));
    } else if (name === "label") {
      this.setState(s => ({
        info: {
          ...s.info,
          layouts: {
            ...s.info.layouts,
            [s.layout]: {
              layout: s.info.layouts[s.layout].layout.map((l, i) => {
                if (i === s.selectedKey) return {...l, label: value};
                return l;
              })
            }
          }
        }
      }));
    } else if (name === "p") {
      this.setState(s => ({
        info: {
          ...s.info,
          layouts: {
            ...s.info.layouts,
            [s.layout]: {
              layout: s.info.layouts[s.layout].layout.map((l, i) => {
                if (i === s.selectedKey) return {...l, p: value.split(",")};
                return l;
              })
            }
          }
        }
      }));
    } else if (name === "c") {
      this.setState(s => ({
        info: {
          ...s.info,
          layouts: {
            ...s.info.layouts,
            [s.layout]: {
              layout: s.info.layouts[s.layout].layout.map((l, i) => {
                if (i === s.selectedKey) return {...l, c: value};
                return l;
              })
            }
          }
        }
      }));
    } else if (name === "t") {
      this.setState(s => ({
        info: {
          ...s.info,
          layouts: {
            ...s.info.layouts,
            [s.layout]: {
              layout: s.info.layouts[s.layout].layout.map((l, i) => {
                if (i === s.selectedKey) return {...l, t: value};
                return l;
              })
            }
          }
        }
      }));
    }
  }

  handleClickCallback(name, value) {
    if (name === "api") {
      let {keyboard} = this.state;
      const hasApi = !!+value;
      fetchKeyboards(hasApi).then(keyboards => {
        keyboard = keyboards.includes(keyboard) ? keyboard : keyboards[0];
        fetchKeyboard(hasApi, keyboard).then(info => {
          this.setState({
            hasApi,
            keyboards,
            info: hasApi ? info.keyboards[keyboard] : info,
            keyboard,
            layout: hasApi ? Object.keys(
              info.keyboards[keyboard].layouts)[0] : Object.keys(
                info.layouts)[0]
          });
        });
      });
    } else {
      this.setState({
        [name]: value
      });
    }
  }

  handleClickCallback_(evt) {
    if (evt.name === "selectedKey") {
      const index = parseInt(evt.index, 10);
      // const hasFocus = evt.target.parentNode === document.activeElement;
      this.setState(s => ({
        // NOTE: Make the key `null` if the previous value was the same (toggle).
        selectedKey: s.selectedKey === index ? null : index
      }));
    } else if (evt.target.name === "add") {
      this.setState(s => {
        const _selectedKey = s.selectedKey !== null ? s.selectedKey : s.info.layouts[s.layout].layout.length - 1;
        const kd = s.info.layouts[s.layout].layout[_selectedKey];
        const w = _selectedKey >= 0 ? kd.w || 1 : 1;
        return {
          selectedKey: s.info.layouts[s.layout].layout.length,
          info: {
            ...s.info,
            layouts: {
              ...s.info.layouts,
              [s.layout]: {
                layout: [
                  ...s.info.layouts[s.layout].layout,
                  {
                    w: 1,  // "add-iso" 1.25
                    h: 1,  // "add-iso" 2
                    p: null,  // "add-iso" [-0.25, 0, 1.25, 0, 1.25, 2, 0, 2, 0, 1, -0.25, 1]
                    x: _selectedKey >= 0 ? kd.x + w : 0,
                    y: _selectedKey >= 0 ? kd.y : 0,
                    r: _selectedKey >= 0 ? kd.r : 0,
                    rx: _selectedKey >= 0 ? kd.rx : 0,
                    ry: _selectedKey >= 0 ? kd.ry : 0,
                    label: ""
                  }
                ]
              }
            }
          }
        };
      });
    } else if (evt.target.name === "remove") {
      this.setState(s => ({
        selectedKey: null,
        info: {
          ...s.info,
          layouts: {
            ...s.info.layouts,
            [s.layout]: {
              layout: s.info.layouts[s.layout].layout.filter((l, i) => {
                if (s.selectedKey === null) {
                  return i < s.info.layouts[s.layout].layout.length - 1;
                }
                return i !== s.selectedKey;
              })
            }
          }
        }
      }));
    }
  }

  handleAceCallback(editor) {
    try {
      const code = JSON.parse(editor.session.getValue());
      this.setState({
        info: code
      });
    } catch (err) {
      console.error(err);
    }
  }

  handleKeyDownCallback(evt) {
    const {selectedKey} = this.state;
    console.log(evt);
    if (evt.key === "ArrowRight") {
      this.setState(s => ({
        info: {
          ...s.info,
          layouts: {
            ...s.info.layouts,
            [s.layout]: {
              layout: s.info.layouts[s.layout].layout.map((l, i) => {
                if (i === selectedKey) return evt.ctrlKey ? {
                  ...l,
                  rx: parseFloat(l.rx || 0) + 0.25
                } : {
                  ...l,
                  x: parseFloat(l.x) + 0.25
                };
                return l;
              })
            }
          }
        }
      }));
    } else if (evt.key === "ArrowLeft") {
      this.setState(s => ({
        info: {
          ...s.info,
          layouts: {
            ...s.info.layouts,
            [s.layout]: {
              layout: s.info.layouts[s.layout].layout.map((l, i) => {
                if (i === selectedKey) return evt.ctrlKey ? {
                  ...l,
                  rx: parseFloat(l.rx || 0) - 0.25
                } : {
                  ...l,
                  x: parseFloat(l.x) - 0.25
                }
                return l;
              })
            }
          }
        }
      }));
    } else if (evt.key === "ArrowUp") {
      this.setState(s => ({
        info: {
          ...s.info,
          layouts: {
            ...s.info.layouts,
            [s.layout]: {
              layout: s.info.layouts[s.layout].layout.map((l, i) => {
                if (i === selectedKey) return evt.ctrlKey ? {
                  ...l,
                  ry: parseFloat(l.ry || 0) - 0.25
                } : {
                  ...l,
                  y: parseFloat(l.y) - 0.25
                }
                return l;
              })
            }
          }
        }
      }));
    } else if (evt.key === "ArrowDown") {
      this.setState(s => ({
        info: {
          ...s.info,
          layouts: {
            ...s.info.layouts,
            [s.layout]: {
              layout: s.info.layouts[s.layout].layout.map((l, i) => {
                if (i === selectedKey) return evt.ctrlKey ? {
                  ...l,
                  ry: parseFloat(l.ry || 0) + 0.25
                } : {
                  ...l,
                  y: parseFloat(l.y) + 0.25
                }
                return l;
              })
            }
          }
        }
      }));
    } else if (evt.key === "Delete") {
      this.setState(s => ({
        selectedKey: null,
        info: {
          ...s.info,
          layouts: {
            ...s.info.layouts,
            [s.layout]: {
              layout: s.info.layouts[s.layout].layout.filter((l, i) => {
                if (s.selectedKey === null) {
                  return i < s.info.layouts[s.layout].layout.length - 1;
                }
                return i !== s.selectedKey;
              })
            }
          }
        }
      }));
    } else if (evt.key === "Insert") {
      this.setState(s => {
        const _selectedKey = s.selectedKey !== null ? s.selectedKey : s.info.layouts[s.layout].layout.length - 1;
        const w = s.info.layouts[s.layout].layout[_selectedKey].w || 1;
        return {
          selectedKey: s.info.layouts[s.layout].layout.length,
          info: {
            ...s.info,
            layouts: {
              ...s.info.layouts,
              [s.layout]: {
                layout: [
                  ...s.info.layouts[s.layout].layout,
                  {
                    x: s.info.layouts[s.layout].layout[_selectedKey].x + w,
                    y: s.info.layouts[s.layout].layout[_selectedKey].y,
                    r: s.info.layouts[s.layout].layout[_selectedKey].r,
                    rx: s.info.layouts[s.layout].layout[_selectedKey].rx,
                    ry: s.info.layouts[s.layout].layout[_selectedKey].ry,
                    label: ""
                  }
                ]
              }
            }
          }
        };
      });
    } else if (evt.key === "Home") {
      this.setState(s => ({
        info: {
          ...s.info,
          layouts: {
            ...s.info.layouts,
            [s.layout]: {
              layout: s.info.layouts[s.layout].layout.map((l, i) => {
                if (i === selectedKey) return {...l, x: 0, y: 0};
                return l;
              })
            }
          }
        }
      }));
    } else if (evt.key === "End") {
      // TODO: Get keyboard size.
    } else if (evt.key === "Shift") {
      this.setState(s => ({
        info: {
          ...s.info,
          layouts: {
            ...s.info.layouts,
            [s.layout]: {
              layout: s.info.layouts[s.layout].layout.map((l, i) => {
                if (i === selectedKey) return evt.code === "ShiftLeft" ? {
                  ...l,
                  r: parseFloat(l.r) -5
                } : {
                  ...l,
                  r: parseFloat(l.r) + 5
                }
                return l;
              })
            }
          }
        }
      }));
    } else if (evt.key.length === 1 && evt.key !== " " && evt.location === 0) {
      const _key = evt.key;
      this.setState(s => ({
        info: {
          ...s.info,
          layouts: {
            ...s.info.layouts,
            [s.layout]: {
              layout: s.info.layouts[s.layout].layout.map((l, i) => {
                if (i === selectedKey) return {...l, label: _key};
                return l;
              })
            }
          }
        }
      }));
    }
  }

  render() {
    const {
      isDevel,
      hasApi,
      keyboards,
      info,
      layout,
      keyboard,
      isInitial,
      isCustom,
      isPrint,
      hasProfile,
      hasCase,
      selectedKey,
      defaultValues
    } = this.state;

    return e(HashRouter, null,
      e(
        Fragment, null,
        e(Nav, {
          isDevel,
          hasApi,
          isPrint,
          hasProfile,
          hasCase,
          onClickCallback: this.handleClickCallback,
          deviceHtml: this.deviceElement,
          onChangeCallback: this.handleChangeCallback
        }),
        e(
          "main", {
            style: {
              display: "flex",
              flexDirection: "column",
              width: "100%",
              overflowX: "auto"
            }
          },
          e(
            "div", null,
            e(
              "div",
              {
                style: {
                  display: "flex",
                  flexWrap: "wrap",
                  padding: "0.5em 0 0 0",
                  justifyContent: "center"
                }
              },
              e(ReactRouterDOM.withRouter(Dropdown), {
                selectRef: elm => this.selectElement = elm,
                name: "keyboard",
                value: keyboard,
                options: keyboards && keyboards.length ? keyboards : null,
                onChangeCallback: this.handleChangeCallback,
                hasApi,
                isInitial,
                isCustom,
                onHashCallback: this.handleHashCallback
              }),
              e(Dropdown, {
                name: "layout",
                value: layout,
                options: info && info.layouts && Object.keys(
                  info.layouts).length ? Object.keys(
                    info.layouts) : null,
                onChangeCallback: this.handleChangeCallback
              }),
              e(Form, {
                formRef: elm => this.formElement = elm,
                onChangeCallback: this.handleChangeCallback
              })
            ),
            e("div",
              {
                style: {
                  padding: "0 0 0.5em 0"
                }
              },
              e(Button, {
                info,
                layout,
                selectedKey,
                defaultValues,
                handleClickCallback_: this.handleClickCallback_,
                handleChangeCallback_: this.handleChangeCallback_
              }),
            ),
            e(ReactRouterDOM.Route, {
              path: `/${keyboard}`,
              children: match => e(Device, {
                ...match,
                deviceRef: elm => this.deviceElement = elm,
                info,
                layout,
                isPrint,
                hasProfile,
                hasCase,
                selectedKey,
                defaultValues,
                handleClickCallback_: this.handleClickCallback_,
                handleKeyDownCallback: this.handleKeyDownCallback
              })
            }),
          ),
          e(Editor, {
            info,
            selectedKey,
            handleAceCallback: this.handleAceCallback
          }),
          e(Footer)
        )
      )
    );
  }
}

ReactDOM.render(e(Root), document.querySelector("#root"));
