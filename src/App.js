import React, { Component } from "react";
import { render } from "react-dom";
import Results from "./Results";
import { Router, Link } from "@reach/router";
import Details from "./Details";

export default class App extends Component {
  render() {
    return (
      <div>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>

        <Router>
          <Results path="/" />
          <Details path="/details/:id" />
        </Router>
      </div>
    );
  }
}

render(React.createElement(App), document.getElementById("root"));
