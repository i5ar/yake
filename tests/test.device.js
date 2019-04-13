/* global chai */
import Form from "../src/form.js";


const e = React.createElement;
const {it, describe, beforeEach, afterEach} = Mocha;

describe("form", function () {
  let container;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });
  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });
});
