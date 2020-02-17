import React from "react";
import { Form } from "./Form";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Form formSchema={{ TFN: true, Address: true }} />
      </header>
    </div>
  );
}

export default App;
