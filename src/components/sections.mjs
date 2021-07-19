/* eslint-disable react/prop-types */

import Article from "./article.mjs";
import Forms from "./forms.mjs";

export default class Sections extends React.Component {

  render() {
    const {
      action,
      svgRef,
      selectRef,
      intl,
      info,
      hasApi,
      isInitial,
      isCustom,
      keyboardName,
      keyboardNames,
      selectedCase,
      selectedKey,
      layoutName,
      housingName,
      defaultValues,
      isPrint,
      hasProfile,
      hasCase,
      step,
      handleHashCallback,
      handleClickCallback,
      handleChangeCallback,
      handleSubmitCallback,
      handleKeyDownCallback
    } = this.props;

    const ulStyle = {
      display: "flex",
      flexDirection: "row",
      listStyleType: "none",
      margin: 0,
      padding: 0
    };
    const liStyle = {
      flexGrow: 1
    };
    const buttonStyle = {
      backgroundColor: "var(--blue)",
      width: "100%",
      borderRadius: 0
    };

    return e(Fragment, null, action === "top" ? e(
      "section",
      {
        style: {
          display: "flex",
          flexWrap: "wrap",
          padding: "0.5em 0 0 0",
          justifyContent: "center"
        }
      },
      e(Forms, {
        action: "info",
        // formRef: elm => this.formElement = elm,
        handleChangeCallback
      }),
      e(Forms, {
        action: "keyboard",
        selectRef,
        hasApi,
        isInitial,
        isCustom,
        keyboardName,
        keyboardNames,
        handleChangeCallback,
        handleHashCallback
      }),
      e(Forms, {
        info,
        layoutName,
        action: "create",
        handleChangeCallback,
        handleSubmitCallback
      }),
    ) : null,
    action === "bottom" ? e(
      "section", {},
      e(
        "ul", {
          className: "step",
          style: ulStyle
        },
        e("li", {
          style: liStyle
        },
          e(
            "button", {
              style: buttonStyle,
              type: "button",
              name: "design",
              className: step === 0 ? "pure-button pure-button-active" : "pure-button",
              onClick: handleClickCallback
            }, "Design",
          )), e("li", {
            style: liStyle
          },
          e("button", {
            style: buttonStyle,
            type: "button",
            name: "assign",
            className: step === 1 ? "pure-button pure-button-active" : "pure-button",
            onClick: handleClickCallback
          }, "Assign")
        )
      ),
      e(Article, {
        svgRef,
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
        handleClickCallback,
        handleChangeCallback,
        handleSubmitCallback,
        handleKeyDownCallback
      })
    ) : null);
  }
}
