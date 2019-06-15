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
      api: false,
      keyboards: [],
      info: {},
      keyboard: "",
      layout: "",
      initial: true,
      custom: false,
      profile: true,
      case_: false,
    };

    this.deviceInput = null;
    this.selectElement = null;
    this.formElement = null;

    this.handleChangeCallback = this.handleChangeCallback.bind(this);
    this.handleHashCallback = this.handleHashCallback.bind(this);
    this.handleClickCallback = this.handleClickCallback.bind(this);
    this.handleAceCallback = debounce(this.handleAceCallback.bind(this), 1000);
  }

  componentDidMount() {
    const spinner = document.querySelector("#spinner");
    spinner.parentNode.removeChild(spinner);

    const makeNoty = (protip) => new Noty({
      timeout: 4000,
      layout: "bottomRight",
      theme: "sunset",
      text: `
      <h3>Protip</h3>
      <p>${protip}</p>`,
    });
    if (document.cookie.includes("protip")) {
      const match = "protip=";
      const matchIndex = document.cookie.indexOf(match);
      const protipIndex = parseInt(document.cookie[matchIndex + match.length], 10);
      if (protipIndex < protips.length - 1) {
        const n = makeNoty(protips[protipIndex + 1]);
        n.show();
        document.cookie = `protip=${protipIndex + 1}`;
      }
    } else {
      const n = makeNoty(protips[0]);
      n.show();
      document.cookie = "protip=0";
    }
  }

  handleHashCallback(keyboards, keyboard, info) {
    this.setState(s => ({
      initial: false,
      keyboards,
      info: s.api ? info.keyboards[keyboard] : info,
      keyboard,
      layout: s.api ? s.layout || k(info.keyboards[keyboard].layouts)[0] : k(info.layouts)[0],
    }));
  }

  handleChangeCallback(name, value) {
    if (name === "keyboard") {
      const {api} = this.state;
      const keyboard = value;
      fetchKeyboard(api, keyboard).then(info => {
        this.setState(s => ({
          info: s.api ? info.keyboards[keyboard] : info,
          keyboard,
          layout: s.api ? k(info.keyboards[keyboard].layouts)[0] : k(info.layouts)[0],
          custom: false,
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
          custom: true,
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
      const api = !!+value;
      fetchKeyboards(api).then(keyboards => {
        keyboard = keyboards.includes(keyboard) ? keyboard : keyboards[0];
        fetchKeyboard(api, keyboard).then(info => {
          this.setState({
            api,
            keyboards,
            info: api ? info.keyboards[keyboard] : info,
            keyboard,
            layout: api ? k(info.keyboards[keyboard].layouts)[0] : k(info.layouts)[0],
          });
        });
      });
    } else {
      this.setState({
        [name]: value,
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
      api,
      keyboards,
      info,
      layout,
      keyboard,
      initial,
      custom,
      profile,
      case_,
    } = this.state;

    return e(ReactRouterDOM.HashRouter, null,
      e(
        f, null,
        e(Nav, {
          api,
          profile,
          case_,
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
                api,
                initial,
                custom,
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
                api,
                info,
                layout,
                profile,
                case_,
              })
            }),
          ),
          e(Button, {
            info
          }),
          e(Editor, {
            info,
            handleAceCallback: this.handleAceCallback,
          }),
          e(Footer)
        )
      )
    );
  }
}

ReactDOM.render(e(Root), document.querySelector("#root"));
