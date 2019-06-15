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
      hasCase: false,
      keydev: null,
    };

    this.protip;

    this.deviceInput = null;
    this.selectElement = null;
    this.formElement = null;

    this.handleChangeCallback = this.handleChangeCallback.bind(this);
    this.handleHashCallback = this.handleHashCallback.bind(this);
    this.handleClickCallback = this.handleClickCallback.bind(this);
    this.handleClickCallback_ = this.handleClickCallback_.bind(this);
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
    if (evt.target.name === "add") {
      this.setState(s => ({
        info: {
          ...s.info,
          layouts: {
            [this.state.layout]: {
              layout: [
                ...s.info.layouts[this.state.layout].layout,
                {
                  w: 1,
                  x: 0,
                  y: 0,
                  label: ""
                }
              ]
            }
          }
        }
      }));
    } else if (evt.target.name === "remove") {
      this.setState(s => ({
        info: {
          ...s.info,
          layouts: {
            [this.state.layout]: {
              layout: s.info.layouts[this.state.layout].layout.filter((l, i) => {
                return i < s.info.layouts[this.state.layout].layout.length - 1;
              })
            }
          }
        }
      }));
    } else if (evt.target.name === "increase-x") {
      const {value} = evt.target.parentNode.childNodes[1];
      this.setState(s => ({
        info: {
          ...s.info,
          layouts: {
            [this.state.layout]: {
              layout: s.info.layouts[this.state.layout].layout.map((l, i) => {
                if (i === this.state.keydev) return {...l, x: (parseFloat(value) + 0.25)};
                return l;
              })
            }
          }
        }
      }));
    } else if (evt.target.name === "decrease-x") {
      console.log(evt.target.name);
    } else if (evt.target.name === "increase-y") {
      console.log(evt.target.name);
    } else if (evt.target.name === "decrease-y") {
      console.log(evt.target.name);
    } else if (evt.target.name === "clockwise-r") {
      console.log(evt.target.name);
    } else if (evt.target.name === "counterclockwise-r") {
      console.log(evt.target.name);
    } else if (evt.name === "keydev") {
      const index = parseInt(evt.index, 10);
      // const hasFocus = evt.target.parentNode === document.activeElement;
      this.setState({
        keydev: index
      });
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

              })
            }),
          ),
          e(Button, {
            info,
            layout,
            keydev,
            handleClickCallback_: this.handleClickCallback_,
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
