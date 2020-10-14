import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { OptionsForm } from "./components/forms";
import { Option } from "./components/forms/Options/Options";

function App() {
  const options: Option[] = [
    { id: "0", name: "alpha", checked: false, value: "α", label: "Alpha - 1" },
    { id: "1", name: "beta", checked: false, value: "β", label: "Beta - 2" },
    { id: "2", name: "gamma", checked: false, value: "γ", label: "Gamma - 3" },
    { id: "3", name: "delta", checked: false, value: "δ", label: "Delta - 4" },
    {
      id: "4",
      name: "epsilon",
      checked: false,
      value: "ε",
      label: "Epsilon - 5",
    },
  ];

  function handleSubmit(values: Option[]) {
    alert(JSON.stringify(values));
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <img src={logo} className="App-logo" alt="logo" />
          React App Sample with Typescript.
        </p>
      </header>
      <main className="App-main">
        <div className="App-main-content">
          <h2 className="App-title">Options Form</h2>
          <OptionsForm options={options} onSubmit={handleSubmit} />
        </div>
      </main>
    </div>
  );
}

export default App;
