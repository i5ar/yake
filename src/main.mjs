import Dropdown from "./components/dropdown.mjs";
import Device from "./components/device.mjs";
import Form from "./components/form.mjs";
import Nav from "./components/nav.mjs";
import Footer from "./components/footer.mjs";
import Editor from "./components/editor.mjs";
import Aside from "./components/aside.mjs";
import {
  fetchKeyboard,
  fetchKeyboards
} from "./common/service.mjs";
import {
  protips
} from "./common/protips.mjs";
import debounce from "./common/debounce.mjs";
import {messages} from "./lang/messages.mjs";

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMenu: true,  // when `false` hides the list from the nav.
      hasApi: false,  // when `true` starts with QMK keyboards.
      hasEditor: true,
      keyboardNames: [],
      info: {},
      keyboardName: "",
      layoutName: "",
      isInitial: true,
      isCustom: false,
      isPrint: false,
      hasProfile: true,
      hasCase: true,
      selectedKey: null,
      selectedCase: null,
      fallbackKey: null,
      defaultValues: {
        unit: 54,
        pivot: 20,  // x, y = 20px
        radius: 5,
        layouts: {
          label: "",
          w: 1,
          h: 1,
          x: 0,
          y: 0,
          r: 0,
          rx: 0,
          ry: 0,
          c: "#fdf6e3",
          t: "#d33682"
        },
        housing: {
          w: 1,
          h: 1,
          x: 0,
          y: 0,
          p: [],
          c: "#93a1a1"
        }
      },
      housingName: ""

      // TODO: Add features.
      // keycap color "c" and legend color "t"
    };

    this.protip;

    this.deviceInput = null;
    this.selectElement = null;
    this.formElement = null;

    this.handleHashCallback = this.handleHashCallback.bind(this);
    this.handleChangeCallback = this.handleChangeCallback.bind(this);
    this.handleClickCallback = this.handleClickCallback.bind(this);
    this.handleSubmitCallback = this.handleSubmitCallback.bind(this);
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

  addKey(name) {
    this.setState(s => {
      const layout = s.info.layouts[s.layoutName].layout;
      const selectedKey = layout[s.selectedKey];
      const x = () => {
        if (name === "add-right") return selectedKey.x + (selectedKey.w || 1);
        else if (name === "add-left") return selectedKey.x - 1;
        else return selectedKey.x;
      }
      const y = () => {
        if (name === "add-down") return selectedKey.y + (selectedKey.h || 1);
        else if (name === "add-up") return selectedKey.y - 1;
        else return selectedKey.y;
      }
      return {
        selectedKey: layout.length,
        fallbackKey: s.fallbackKey + 1,
        info: {
          ...s.info,
          layouts: {
            ...s.info.layouts,
            [s.layoutName]: {
              layout: [
                ...layout,
                {
                  w: 1,
                  h: 1,
                  p: null,
                  x: x(),
                  y: y(),
                  r: selectedKey.r || 0,
                  rx: selectedKey.rx || 0,
                  ry: selectedKey.ry || 0,
                  label: ""
                }
              ]
            }
          }
        }
      };
    });
  }

  transformKey(name) {
    this.setState(s => {
      const w = (l) => {
        if (name === "scale-right") return (l.w || 1) + 0.25;
        else if (name === "scale-left") return (l.w || 1) - 0.25;
        else return l.w || 1;
      };
      const h = (l) => {
        if (name === "scale-down") return (l.h || 1) + 0.25;
        else if (name === "scale-up") return (l.h || 1) - 0.25;
        else return l.h || 1;
      };
      const x = (l) => {
        if (name === "translate-right") return (l.x || 0) + 0.25;
        else if (name === "translate-left") return (l.x || 0) - 0.25;
        else return l.x || 0;
      }
      const y = (l) => {
        if (name === "translate-down") return (l.y || 0) + 0.25;
        else if (name === "translate-up") return (l.y || 0) - 0.25;
        else return l.y || 0;
      }
      const r = (l) => {
        if (name === "rotate-right") return (l.r || 0) + 5;
        else if (name === "rotate-left") return (l.r || 0) - 5;
        else return l.r || 0;
      }
      return {
        info: {
        ...s.info,
        layouts: {
          ...s.info.layouts,
          [s.layoutName]: {
            layout: s.info.layouts[s.layoutName].layout.map(
              (l, i) => i === s.selectedKey ? {
                ...l,
                x: x(l),
                y: y(l),
                w: w(l),
                h: h(l),
                r: r(l),
              } : l)
          }
        }
      }
    }
    });
  }

  handleHashCallback(keyboardNames, keyboardName, prevInfo) {
    const info = this.state.hasApi ? prevInfo.keyboards[keyboardName] : prevInfo
    const layoutName = Object.keys(info.layouts)[0];
    const fallbackKey = info.layouts[layoutName]?.layout.length - 1;
    const housingName = Object.keys(info.housing)[0];
    this.setState(s => ({
      fallbackKey,
      isInitial: false,
      keyboardNames,
      info,
      keyboardName,
      housingName,
      layoutName
    }));
  }

  handleSubmitCallback(evt) {
    const {name, value} = evt.target.querySelector("input[name=create]");
    if (name === "create") {
      this.setState(s => {
        return {
          layoutName: value,
          info: {
            ...s.info,
            layouts: {
              ...s.info.layouts,
              [value]: s.info.layouts[s.layoutName]
            }
          }
        }
      });
    }
  }

  handleChangeCallback(evt) {
    const {name, value, type} = evt.target;

    // if (name === "keycaps") {
    //   this.setState(s => {
    //     if (value < s.info.layouts[this.state.layoutName].layout.length) {
    //       return {
    //         info: {
    //           ...s.info,
    //           layouts: {
    //             [this.state.layoutName]: {
    //               layout: s.info.layouts[this.state.layoutName].layout.filter((l, i) => {
    //                 return i < s.info.layouts[this.state.layoutName].layout.length - 1;
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
    //           [this.state.layoutName]: {
    //             layout: [
    //               ...s.info.layouts[this.state.layoutName].layout,
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

    if (type === "checkbox") {
      const {checked} = evt.target;
      this.setState({
        [name]: checked
      });
    } else if (type === "file") {
      const {files} = evt.target;
      if (name === "info") {
        const reader = new FileReader();
        reader.readAsText(files[0]);
        reader.onload = evt => {
          const info = JSON.parse(evt.target.result);
          this.setState({
            info,
            keyboardName: info.keyboard_name.toLowerCase(),
            layoutName: Object.keys(info.layouts)[0],
            isCustom: true
          });
        };
      }
    } else {
      if (name === "keyboard") {
        const {hasApi} = this.state;
        const keyboardName = value;
        fetchKeyboard(hasApi, keyboardName).then(prevInfo => {
          const info = hasApi ? prevInfo.keyboards[keyboardName] : prevInfo;
          const layoutName = Object.keys(info.layouts)[0];
          const fallbackKey = info.layouts[layoutName]?.layout.length - 1;
          const housingName = info.housing ? Object.keys(info.housing)[0] : "";
          this.setState(s => ({
            info,
            keyboardName,
            housingName,
            fallbackKey,
            layoutName,
            isCustom: false
          }));
          if (this.selectElement) this.selectElement.focus();
          if (this.formElement) this.formElement.reset();
        });
      } else if (name === "layout") {
        const {info} = this.state;
        const layoutName = value;
        const fallbackKey = info.layouts[layoutName]?.layout.length - 1;
        this.setState({
          layoutName,
          fallbackKey
        });
      } else if (name === "mode" && parseInt(value, 10) === 1) { // remove
        this.setState(s => ({
          selectedKey: null,
          fallbackKey: s.fallbackKey - 1,
          info: {
            ...s.info,
            layouts: {
              ...s.info.layouts,
              [s.layoutName]: {
                layout: s.info.layouts[s.layoutName].layout.filter(
                  (l, i) => i !== s.selectedKey)
              }
            }
          }
        }));
      } else if (name === "x") {
        this.setState(s => ({
          info: this.state.selectedKey !== null ? {
            ...s.info,
            layouts: {
              ...s.info.layouts,
              [s.layoutName]: {
                layout: s.info.layouts[s.layoutName].layout.map((l, i) => {
                  if (i === s.selectedKey) return {...l, x: parseFloat(value)};
                  return l;
                })
              }
            }
          } : s.info,
          defaultValues: {
            ...s.defaultValues,
            layouts: {
              ...s.defaultValues.layouts,
              x: parseFloat(value)
            }
          }
        }));
      } else if (name === "y") {
        this.setState(s => ({
          info: this.state.selectedKey !== null ? {
            ...s.info,
            layouts: {
              ...s.info.layouts,
              [s.layoutName]: {
                layout: s.info.layouts[s.layoutName].layout.map((l, i) => {
                  if (i === s.selectedKey) return {...l, y: parseFloat(value)};
                  return l;
                })
              }
            }
          } : s.info,
          defaultValues: {
            ...s.defaultValues,
            layouts: {
              ...s.defaultValues.layouts,
              y: parseFloat(value)
            }
          }
        }));
      } else if (name === "w") {
        this.setState(s => ({
          info: this.state.selectedKey !== null ? {
            ...s.info,
            layouts: {
              ...s.info.layouts,
              [s.layoutName]: {
                layout: s.info.layouts[s.layoutName].layout.map((l, i) => {
                  if (i === s.selectedKey) return {...l, w: parseFloat(value)};
                  return l;
                })
              }
            }
          } : s.info,
          defaultValues: {
            ...s.defaultValues,
            layouts: {
              ...s.defaultValues.layouts,
              w: parseFloat(value)
            }
          }
        }));
      } else if (name === "h") {
        this.setState(s => ({
          info: {
            ...s.info,
            layouts: {
              ...s.info.layouts,
              [s.layoutName]: {
                layout: s.info.layouts[s.layoutName].layout.map((l, i) => {
                  if (i === s.selectedKey) return {...l, h: parseInt(value, 10)};
                  return l;
                })
              }
            }
          },
          defaultValues: {
            ...s.defaultValues,
            layouts: {
              ...s.defaultValues.layouts,
              h: parseInt(value, 10)
            }
          }
        }));
      } else if (name === "r") {
        this.setState(s => ({
          info: this.state.selectedKey !== null ? {
            ...s.info,
            layouts: {
              ...s.info.layouts,
              [s.layoutName]: {
                layout: s.info.layouts[s.layoutName].layout.map((l, i) => {
                  if (i === s.selectedKey) return {...l, r: parseInt(value, 10)};
                  return l;
                })
              }
            }
          } : s.info
        }));
        this.setState(s => ({
          defaultValues: {
            ...s.defaultValues,
            layouts: {
              ...s.defaultValues.layouts,
              r: parseInt(value, 10)
            }
          }
        }));
      } else if (name === "rx") {
        this.setState(s => ({
          info: this.state.selectedKey !== null ? {
            ...s.info,
            layouts: {
              ...s.info.layouts,
              [s.layoutName]: {
                layout: s.info.layouts[s.layoutName].layout.map((l, i) => {
                  if (i === s.selectedKey) return {...l, rx: parseFloat(value)};
                  return l;
                })
              }
            }
          } : s.info,
          defaultValues: {
            ...s.defaultValues,
            layouts: {
              ...s.defaultValues.layouts,
              rx: parseFloat(value)
            }
          }
        }));
      } else if (name === "ry") {
        this.setState(s => ({
          info: this.state.selectedKey !== null ? {
            ...s.info,
            layouts: {
              ...s.info.layouts,
              [s.layoutName]: {
                layout: s.info.layouts[s.layoutName].layout.map((l, i) => {
                  if (i === s.selectedKey) return {...l, ry: parseFloat(value)};
                  return l;
                })
              }
            }
          } : s.info,
          defaultValues: {
            ...s.defaultValues,
            layouts: {
              ...s.defaultValues.layouts,
              ry: parseFloat(value)
            }
          }
        }));
      } else if (name === "p") {
        this.setState(s => ({
          info: {
            ...s.info,
            layouts: {
              ...s.info.layouts,
              [s.layoutName]: {
                layout: s.info.layouts[s.layoutName].layout.map((l, i) => {
                  if (i === s.selectedKey) return {...l, p: value.split(",")};
                  return l;
                })
              }
            }
          }
        }));
      } else if (name === "label") {
        this.setState(s => ({
          info: this.state.selectedKey !== null ? {
            ...s.info,
            layouts: {
              ...s.info.layouts,
              [s.layoutName]: {
                layout: s.info.layouts[s.layoutName].layout.map((l, i) => {
                  if (i === s.selectedKey) return {...l, label: value};
                  return l;
                })
              }
            }
          } : s.info,
          defaultValues: {
            ...s.defaultValues,
            layouts: {
              ...s.defaultValues.layouts,
              label: value
            }
          }
        }));
      } else if (name === "c") {
        this.setState(s => ({
          info: this.state.selectedKey !== null ? {
            ...s.info,
            layouts: {
              ...s.info.layouts,
              [s.layoutName]: {
                layout: s.info.layouts[s.layoutName].layout.map((l, i) => {
                  if (i === s.selectedKey) return {...l, c: value};
                  return l;
                })
              }
            }
          } : s.info,
          defaultValues: {
            ...s.defaultValues,
            layouts: {
              ...s.defaultValues.layouts,
              c: value
            }
          }
        }));
      } else if (name === "t") {
        this.setState(s => ({
          info: this.state.selectedKey !== null ? {
            ...s.info,
            layouts: {
              ...s.info.layouts,
              [s.layoutName]: {
                layout: s.info.layouts[s.layoutName].layout.map((l, i) => {
                  if (i === s.selectedKey) return {...l, t: value};
                  return l;
                })
              }
            }
          } : s.info,
          defaultValues: {
            ...s.defaultValues,
            layouts: {
              ...s.defaultValues.layouts,
              t: value
            }
          }
        }));
      } else if (name === "housing-w") {
        this.setState(s => {
          return {
            info: {
              ...s.info,
              housing: {
                ...s.info.housing,
                [s.housingName]: {
                  shape: s.info.housing[s.housingName].shape.map((l, i) => ({...l, w: parseFloat(value)}))
                }
              }
            }
          }
        });
      } else if (name === "housing-h") {
        this.setState(s => {
          return {
            info: {
              ...s.info,
              housing: {
                ...s.info.housing,
                [s.housingName]: {
                  shape: s.info.housing[s.housingName].shape.map(
                    (l, i) => ({...l, h: parseFloat(value)}))
                }
              }
            }
          }
        });
      } else if (name === "housing-x") {
        this.setState(s => {
          return {
            info: {
              ...s.info,
              housing: {
                ...s.info.housing,
                [s.housingName]: {
                  shape: s.info.housing[s.housingName].shape.map(
                    (l, i) => ({...l, x: parseFloat(value)}))
                }
              }
            }
          }
        });
      } else if (name === "housing-y") {
        this.setState(s => {
          return {
            info: {
              ...s.info,
              housing: {
                ...s.info.housing,
                [s.housingName]: {
                  shape: s.info.housing[s.housingName].shape.map(
                    (l, i) => ({...l, y: parseFloat(value)}))
                }
              }
            }
          }
        });
      } else {
        this.setState({
          [name]: value
        });
      }
    }
  }

  handleClickCallback(evt) {
    const {defaultValues} = this.state;
    const {name, dataset} = evt.target;
    if (dataset.api) {
      let {keyboardName} = this.state;
      const hasApi = !!+dataset.api;
      fetchKeyboards(hasApi).then(keyboardNames => {
        keyboardName = keyboardNames.includes(keyboardName) ? keyboardName : keyboardNames[0];
        fetchKeyboard(hasApi, keyboardName).then(prevInfo => {
          const info = hasApi ? prevInfo.keyboards[keyboardName] : prevInfo;
          const layoutName = Object.keys(info.layouts)[0];
          const fallbackKey = info.layouts[layoutName]?.layout.length - 1;
          const housingName = info.housing ? Object.keys(info.housing)[0] : "";
          this.setState({
            hasApi,
            keyboardNames,
            info,
            keyboardName,
            housingName,
            fallbackKey,
            layoutName
          });
        });
      });
    } else if (dataset.index) {
      const index = parseInt(dataset.index, 10);
      // const hasFocus = evt.target.parentNode === document.activeElement;
      this.setState(s => ({
        // NOTE: Make the key `null` if the previous value was the same (toggle).
        selectedKey: s.selectedKey === index ? null : index
      }));
    } else if (name === "add") {
      if (this.state.selectedKey !== null) {
        this.setState(s => {
          const layout = s.info.layouts[s.layoutName].layout;
          const selectedKey = layout[s.selectedKey];
          return {
            selectedKey: layout.length,
            fallbackKey: s.fallbackKey + 1,
            info: {
              ...s.info,
              layouts: {
                ...s.info.layouts,
                [s.layoutName]: {
                  layout: [
                    ...layout,
                    {
                      w: defaultValues.layouts.w,  // "add-iso" 1.25
                      h: defaultValues.layouts.h,  // "add-iso" 2
                      p: null,  // "add-iso" [-0.25, 0, 1.25, 0, 1.25, 2, 0, 2, 0, 1, -0.25, 1]
                      x: selectedKey.x + (selectedKey.w || 1),
                      y: selectedKey.y,
                      r: selectedKey.r || 0,
                      rx: selectedKey.rx || 0,
                      ry: selectedKey.ry || 0,
                      label: ""
                    }
                  ]
                }
              }
            }
          };
        });
      } else {
        this.setState(s => {
          const layout = s.info.layouts[s.layoutName].layout;
          return {
            selectedKey: layout.length,
            fallbackKey: s.fallbackKey + 1,
            info: {
              ...s.info,
              layouts: {
                ...s.info.layouts,
                [s.layoutName]: {
                  layout: [
                    ...layout,
                    {
                      w: defaultValues.layouts.w,  // "add-iso" 1.25
                      h: defaultValues.layouts.h,  // "add-iso" 2
                      p: null,  // "add-iso" [-0.25, 0, 1.25, 0, 1.25, 2, 0, 2, 0, 1, -0.25, 1]
                      x: defaultValues.layouts.x,
                      y: defaultValues.layouts.y,
                      r: defaultValues.layouts.r,
                      rx: defaultValues.layouts.rx,
                      ry: defaultValues.layouts.ry,
                      label: ""
                    }
                  ]
                }
              }
            }
          };
        });
      }
    } else if (name === "remove") {
      this.setState(s => ({
        selectedKey: null,
        fallbackKey: s.fallbackKey - 1,
        info: {
          ...s.info,
          layouts: {
            ...s.info.layouts,
            [s.layoutName]: {
              layout: s.info.layouts[s.layoutName].layout.filter((l, i) => {
                if (s.selectedKey === null) {
                  return i < s.info.layouts[s.layoutName].layout.length - 1;
                }
                return i !== s.selectedKey;
              })
            }
          }
        }
      }));
    } else if (name === "add-right" || name === "add-left" || name === "add-up" || name === "add-down") {
      this.addKey(name);
    } else if (
      name === "scale-right" ||
      name === "scale-left" ||
      name === "scale-up" ||
      name === "scale-down" ||
      name === "rotate-right" ||
      name === "rotate-left" ||
      name === "translate-right" ||
      name === "translate-left" ||
      name === "translate-up" ||
      name === "translate-down") {
      this.transformKey(name);
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
    if (evt.key === "ArrowRight") {
      this.setState(s => ({
        info: {
          ...s.info,
          layouts: {
            ...s.info.layouts,
            [s.layoutName]: {
              layout: s.info.layouts[s.layoutName].layout.map((l, i) => {
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
            [s.layoutName]: {
              layout: s.info.layouts[s.layoutName].layout.map((l, i) => {
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
            [s.layoutName]: {
              layout: s.info.layouts[s.layoutName].layout.map((l, i) => {
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
            [s.layoutName]: {
              layout: s.info.layouts[s.layoutName].layout.map((l, i) => {
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
        fallbackKey: s.fallbackKey - 1,
        info: {
          ...s.info,
          layouts: {
            ...s.info.layouts,
            [s.layoutName]: {
              layout: s.info.layouts[s.layoutName].layout.filter((l, i) => {
                if (s.selectedKey === null) {
                  return i < s.info.layouts[s.layoutName].layout.length - 1;
                }
                return i !== s.selectedKey;
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
            [s.layoutName]: {
              layout: s.info.layouts[s.layoutName].layout.map((l, i) => {
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
      hasMenu,
      hasApi,
      hasEditor,
      keyboardNames,
      info,
      layoutName,
      housingName,
      keyboardName,
      isInitial,
      isCustom,
      isPrint,
      hasProfile,
      hasCase,
      selectedKey,
      selectedCase,
      defaultValues
    } = this.state;
    const {intl} = this.props;

    return e(HashRouter, null,
      e(
        Fragment, null,
        e(Nav, {
          intl,
          hasMenu,
          hasApi,
          isPrint,
          hasProfile,
          hasCase,
          handleClickCallback: this.handleClickCallback,
          deviceHtml: this.deviceElement,
          handleChangeCallback: this.handleChangeCallback
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
            "section",
            {
              style: {
                display: "flex",
                flexWrap: "wrap",
                padding: "0.5em 0 0 0",
                justifyContent: "center"
              }
            },
            e(r(Dropdown), {
              selectRef: elm => this.selectElement = elm,
              name: "keyboard",
              value: keyboardName,
              options: keyboardNames?.length ? keyboardNames : null,
              handleChangeCallback: this.handleChangeCallback,
              hasApi,
              isInitial,
              isCustom,
              onHashCallback: this.handleHashCallback
            }),
            e(Dropdown, {
              name: "layout",
              value: layoutName,
              options: info && info.layouts && Object.keys(
                info.layouts).length ? Object.keys(
                  info.layouts) : null,
                handleChangeCallback: this.handleChangeCallback
            }),
            e(Form, {
              action: "info",
              formRef: elm => this.formElement = elm,
              handleChangeCallback: this.handleChangeCallback
            }),
            e(Form, {
              action: "create",
              handleSubmitCallback: this.handleSubmitCallback
            }),
          ),
          e(Route, {
            path: `/${keyboardName}`,
            children: match => e(Device, {
              ...match,
              deviceRef: elm => this.deviceElement = elm,
              info,
              intl,
              layoutName,
              housingName,
              isPrint,
              hasProfile,
              hasCase,
              selectedKey,
              selectedCase,
              defaultValues,
              handleClickCallback: this.handleClickCallback,
              handleChangeCallback: this.handleChangeCallback,
              handleKeyDownCallback: this.handleKeyDownCallback
            })
          }),
          hasEditor ? e(Editor, {
            info,
            selectedKey,
            handleAceCallback: this.handleAceCallback
          }) : null),
        e(Aside, {
          intl,
          hasMenu,
          hasApi,
          isPrint,
          hasProfile,
          hasCase,
          handleClickCallback: this.handleClickCallback,
          deviceHtml: this.deviceElement,
          handleChangeCallback: this.handleChangeCallback
        }),
        e(Footer)
      )
    );
  }
}

ReactDOM.render(
  e(IntlProvider, {
      messages: messages.it, // translationsForUsersLocale
      locale: "it", // userLocale
      defaultLocale: "en"
    }, e(i(Root))
  ), document.getElementById("root")
);

/*
e("p", null, e(FormattedMessage, {
  id: "login",
  defaultMessage: "Login to check the meals"
}) )
// or
const {intl} = this.props;
value: intl.formatMessage(m({
  id: "send",
  defaultMessage: "Close and send",
}))
*/