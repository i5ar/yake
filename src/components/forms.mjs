/* eslint-disable react/prop-types */

import Select from "./select.mjs";

export default class Forms extends React.Component {
  constructor() {
    super();
    this.state = {value: ""};
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(evt) {
    const {name, value} = evt.target;
    if (name === "create") {
      this.setState({value})
    } else if (name === "info") {
      this.props.handleChangeCallback(evt);
    }
  }

  handleSubmit(evt) {
    evt.preventDefault();
    // evt.target.name = "create";
    // evt.target.value = this.state.value;
    this.props.handleSubmitCallback(evt);
  }

  handleClick(evt) {
    evt.target.value = "";
  }

  render() {

    const {
      selectRef,
      hasApi,
      isInitial,
      isCustom,
      keyboardName,
      keyboardNames,
      info,
      handleChangeCallback,
      handleHashCallback,
      // formRef,
      action,
      layoutName
    } = this.props;
    return e(Fragment, null,
      action === "info" ? e("div", {
        // ref: formRef,
        className: "form pure-form"
      }, e("input", {
        className: "pure-button",
        type: "file",
        name: action,
        accept: ".json",
        onChange: this.handleChange,
        onClick: this.handleClick
      })) : null,
      action === "keyboard" ? e(
        "div", {
          className: "form pure-form",
        },
        e(r(Select), {
        selectRef,
        name: "keyboard",
        value: keyboardName,
        options: keyboardNames?.length ? keyboardNames : null,
        handleChangeCallback,
        hasApi,
        isInitial,
        isCustom,
        onHashCallback: handleHashCallback,
      })) : null,
      action === "create" ? e(
        "form", {
          id: "create",
          className: "form pure-form",
          onSubmit: this.handleSubmit
        },
        e("fieldset", null,
          e(Select, {
            name: "layout",
            value: layoutName,
            borders: [false, true, true, false],
            options: info && info.layouts && Object.keys(
              info.layouts).length ? Object.keys(
                info.layouts) : null,
              handleChangeCallback
          }),
          e("input", {
            style: {
              borderRadius: 0
            },
            name: action,
            type: "text",
            onChange: this.handleChange
          }), e("input", {
            style: {
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0
            },
            className: "pure-button",
            type: "submit",
            value: "Create",
            // name: "create",
            // onClick: this.handleSubmitClick
          }))
        ) : null
    );
  }
}
