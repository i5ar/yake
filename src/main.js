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

const e = React.createElement;
const f = React.Fragment;
const k = Object.keys;

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasApi: false,
      keyboards: [],
      info: {},
      keyboard: "",
      layout: "",
      isInitial: true,
      isCustom: false,
      hasProfile: true,
      hasCase: true,
      keydev: null,
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
      <p>${protip}</p>`,
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
      layout: s.hasApi ? s.layout || k(info.keyboards[keyboard].layouts)[0] : k(info.layouts)[0],
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
          layout: s.hasApi ? k(info.keyboards[keyboard].layouts)[0] : k(info.layouts)[0],
          isCustom: false,
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
          layout: k(info.layouts)[0],
          isCustom: true,
        });
      };
    } else {
      this.setState({
        [name]: value,
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
                if (i === s.keydev) return {...l, x: parseFloat(value)};
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
                if (i === s.keydev) return {...l, y: parseFloat(value)};
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
                if (i === s.keydev) return {...l, w: parseFloat(value)};
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
                if (i === s.keydev) return {...l, h: parseInt(value, 10)};
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
                if (i === s.keydev) return {...l, r: parseInt(value, 10)};
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
                if (i === s.keydev) return {...l, rx: parseFloat(value)};
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
                if (i === s.keydev) return {...l, ry: parseFloat(value)};
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
                if (i === s.keydev) return {...l, label: value};
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
                if (i === s.keydev) return {...l, p: value.split(",")};
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
            layout: hasApi ? k(info.keyboards[keyboard].layouts)[0] : k(info.layouts)[0],
          });
        });
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
  }

  handleClickCallback_(evt) {
    if (evt.name === "keydev") {
      const index = parseInt(evt.index, 10);
      // const hasFocus = evt.target.parentNode === document.activeElement;
      this.setState(s => ({
        // NOTE: Make the key `null` if the previous value was the same (toggle).
        keydev: s.keydev === index ? null : index
      }));
    } else if (evt.target.name === "add") {
      this.setState(s => {
        const _keydev = s.keydev !== null ? s.keydev : s.info.layouts[s.layout].layout.length - 1;
        const w = _keydev >= 0 ? s.info.layouts[s.layout].layout[_keydev].w || 1 : 1;
        return {
          keydev: s.info.layouts[s.layout].layout.length,
          info: {
            ...s.info,
            layouts: {
              ...s.info.layouts,
              [s.layout]: {
                layout: [
                  ...s.info.layouts[s.layout].layout,
                  {
                    x: _keydev >= 0 ? s.info.layouts[s.layout].layout[_keydev].x + w : 0,
                    y: _keydev >= 0 ? s.info.layouts[s.layout].layout[_keydev].y : 0,
                    r: _keydev >= 0 ? s.info.layouts[s.layout].layout[_keydev].r : 0,
                    rx: _keydev >= 0 ? s.info.layouts[s.layout].layout[_keydev].rx : 0,
                    ry: _keydev >= 0 ? s.info.layouts[s.layout].layout[_keydev].ry : 0,
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
        keydev: null,
        info: {
          ...s.info,
          layouts: {
            ...s.info.layouts,
            [s.layout]: {
              layout: s.info.layouts[s.layout].layout.filter((l, i) => {
                if (s.keydev === null) {
                  return i < s.info.layouts[s.layout].layout.length - 1;
                }
                return i !== s.keydev;
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
        info: code,
      });
    } catch (err) {
      console.error(err);
    }
  }

  handleKeyDownCallback(evt) {
    const {keydev} = this.state;
    if (evt.key === "ArrowRight") {
      this.setState(s => ({
        info: {
          ...s.info,
          layouts: {
            ...s.info.layouts,
            [s.layout]: {
              layout: s.info.layouts[s.layout].layout.map((l, i) => {
                if (i === keydev) return {...l, x: parseFloat(l.x) + 0.25};
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
                if (i === keydev) return {...l, x: parseFloat(l.x) - 0.25};
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
                if (i === keydev) return {...l, y: parseFloat(l.y) - 0.25};
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
                if (i === keydev) return {...l, y: parseFloat(l.y) + 0.25};
                return l;
              })
            }
          }
        }
      }));
    } else if (evt.key === "Delete") {
      this.setState(s => ({
        keydev: null,
        info: {
          ...s.info,
          layouts: {
            ...s.info.layouts,
            [s.layout]: {
              layout: s.info.layouts[s.layout].layout.filter((l, i) => {
                if (s.keydev === null) {
                  return i < s.info.layouts[s.layout].layout.length - 1;
                }
                return i !== s.keydev;
              })
            }
          }
        }
      }));
    } else if (evt.key === "Insert") {
      this.setState(s => {
        const _keydev = s.keydev !== null ? s.keydev : s.info.layouts[s.layout].layout.length - 1;
        const w = s.info.layouts[s.layout].layout[_keydev].w || 1;
        return {
          keydev: s.info.layouts[s.layout].layout.length,
          info: {
            ...s.info,
            layouts: {
              ...s.info.layouts,
              [s.layout]: {
                layout: [
                  ...s.info.layouts[s.layout].layout,
                  {
                    x: s.info.layouts[s.layout].layout[_keydev].x + w,
                    y: s.info.layouts[s.layout].layout[_keydev].y,
                    r: s.info.layouts[s.layout].layout[_keydev].r,
                    rx: s.info.layouts[s.layout].layout[_keydev].rx,
                    ry: s.info.layouts[s.layout].layout[_keydev].ry,
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
                if (i === keydev) return {...l, x: 0, y: 0};
                return l;
              })
            }
          }
        }
      }));
    } else if (evt.key === "End") {
      // TODO: Get keyboard size.
    } else if (evt.key.length === 1 && evt.key !== " " && evt.location === 0) {
      const _key = evt.key;
      this.setState(s => ({
        info: {
          ...s.info,
          layouts: {
            ...s.info.layouts,
            [s.layout]: {
              layout: s.info.layouts[s.layout].layout.map((l, i) => {
                if (i === keydev) return {...l, label: _key};
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
      hasApi,
      keyboards,
      info,
      layout,
      keyboard,
      isInitial,
      isCustom,
      hasProfile,
      hasCase,
      keydev,
    } = this.state;

    return e(ReactRouterDOM.HashRouter, null,
      e(
        f, null,
        e(Nav, {
          hasApi,
          hasProfile,
          hasCase,
          onClickCallback: this.handleClickCallback,
          deviceHtml: this.deviceElement,
          onChangeCallback: this.handleChangeCallback,
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
              "div", {
                style: {
                  display: "flex",
                  flexWrap: "wrap",
                  padding: "0.5em 0",
                  justifyContent: "center",
                },
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
                onHashCallback: this.handleHashCallback,
              }),
              e(Dropdown, {
                name: "layout",
                value: layout,
                options: info && info.layouts && k(info.layouts).length ? k(
                  info.layouts) : null,
                onChangeCallback: this.handleChangeCallback,
              }),
              e(Form, {
                formRef: elm => this.formElement = elm,
                onChangeCallback: this.handleChangeCallback,
              })
            ),
            e(ReactRouterDOM.Route, {
              path: `/${keyboard}`,
              children: match => e(Device, {
                ...match,
                deviceRef: elm => this.deviceElement = elm,
                info,
                layout,
                hasProfile,
                keydev,
                hasCase,
                handleClickCallback_: this.handleClickCallback_,
                handleKeyDownCallback: this.handleKeyDownCallback,
              })
            }),
          ),
          e(Button, {
            info,
            layout,
            keydev,
            handleClickCallback_: this.handleClickCallback_,
            handleChangeCallback_: this.handleChangeCallback_,
          }),
          e(Editor, {
            info,
            keydev,
            handleAceCallback: this.handleAceCallback,
          }),
          e(Footer)
        )
      )
    );
  }
}

ReactDOM.render(e(Root), document.querySelector("#root"));
