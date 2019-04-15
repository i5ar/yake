import Dropdown from "./dropdown.js";
import Device from "./device.js";
import Form from "./form.js";
import Nav from "./nav.js";
import Footer from "./footer.js";
import Editor from "./editor.js";
import {
  fetchKeyboard,
  fetchKeyboards
} from "./common/service.js";
import {
  getProtip
} from "./common/protips.js";

const e = React.createElement;
const k = Object.keys;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      api: false,
      keyboards: [],
      info: {},
      keyboard: "spezzata",
      layout: "",
      initial: true,
      custom: false,
      code: "",
    };

    this.selectElement = null;
    this.formElement = null;

    this.handleChangeCallback = this.handleChangeCallback.bind(this);
    this.handleHashCallback = this.handleHashCallback.bind(this);
    this.handleClickCallback = this.handleClickCallback.bind(this);
  }

  componentDidMount() {
    const spinner = document.querySelector("#spinner");
    spinner.parentNode.removeChild(spinner);

    const protip = getProtip();
    const n = new Noty({
      layout: "bottomRight",
      theme: "sunset",
      text: `
      <h3>Protip</h3>
      <p>${protip}</p>`,
    });
    n.show();
  }

  handleHashCallback(keyboards, keyboard, info) {
    this.setState(s => ({
      initial: false,
      keyboards,
      info: s.api ? info.keyboards[keyboard] : info,
      keyboard,
      layout: s.api ? s.layout || k(info.keyboards[keyboard].layouts)[0] : k(info.layouts)[0],
      code: s.api ? JSON.stringify(info.keyboards[keyboard], null, 4) : JSON.stringify(info, null, 4),
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
          code: s.api ? JSON.stringify(info.keyboards[keyboard], null, 4) : JSON.stringify(info, null, 4),
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
            code: api ? JSON.stringify(info.keyboards[keyboard], null, 4) : JSON.stringify(info, null, 4),
          });
        });
      });
    } else {
      this.setState({
        [name]: value,
      });
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
      code,
    } = this.state;

    return e(ReactRouterDOM.HashRouter, null,
      e(
        "div", null,
        e(Nav, {
          api,
          onClickCallback: this.handleClickCallback,
        }),
        e(
          "div", {
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
                api,
                info,
                layout,
              })
            }),
          ),
          e(Editor, {
            code,
          }),
          e(Footer, {
            onChangeCallback: this.handleChangeCallback,
            api
          })
        )
      )
    );
  }
}

const Root = () => e(
  "div", {
    style: {
      height: "inherit",
    }
  },
  e(App));

ReactDOM.render(e(Root), document.querySelector("#root"));
