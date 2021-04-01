/* eslint-disable react/prop-types */

import Dropdown from "./dropdown.mjs";

export default class Form extends React.Component {
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
      formRef,
      action,
      layoutName
    } = this.props;
    return e(
      "form", {
        className: "form pure-form",
        ref: formRef,
        onSubmit: this.handleSubmit
      },
      action === "info" ? e("input", {
        className: "pure-button",
        type: "file",
        name: action,
        accept: ".json",
        onChange: this.handleChange,
        onClick: this.handleClick
      }) : null,
      action === "create" ? e("fieldset", null,
        e(Dropdown, {
          name: "layout",
          value: layoutName,
          options: info && info.layouts && Object.keys(
            info.layouts).length ? Object.keys(
              info.layouts) : null,
            handleChangeCallback
        }),
        e("input", {
          style: {
            borderRadius: "var(--radius)",
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0
          },
          name: action,
          type: "text",
          onChange: this.handleChange
        }), e("input", {
          style: {
            borderRadius: "var(--radius)",
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0
          },
          className: "pure-button",
          type: "submit",
          value: "Create",
          // name: "create",
          // onClick: this.handleSubmitClick
        })) : null,
        action === "keyboard" ? e(r(Dropdown), {
          selectRef,
          name: "keyboard",
          value: keyboardName,
          options: keyboardNames?.length ? keyboardNames : null,
          handleChangeCallback,
          hasApi,
          isInitial,
          isCustom,
          onHashCallback: handleHashCallback,
        }) : null
    );
  }
}
