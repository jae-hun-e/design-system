import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { vars, classes } from "@designsystem/themes";

import styled from "@emotion/styled";

function App() {
  return <View />;
}

export default App;

const View = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <Text color={vars.colors.$static.light.gray[300]}>
        font color is : {vars.colors.$static.light.gray[300]}
        {vars.box.radius.base}
      </Text>
      <Text color={vars.colors.$static.dark.gray[300]}>
        font color:dark is : {vars.colors.$static.dark.gray[300]}
      </Text>
      <a
        className="App-link heading-2xl"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>
);

const Text = styled.p`
  ${classes.typography.heading["4xl"]}
  color: ${({ color }) => color};
`;
