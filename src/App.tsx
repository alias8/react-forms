import React from 'react';
import {Form} from "./Form";
import "./App.css"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Form formSchema={{name: true, gender: true, dob: true, contact: true, guardian: true}}/>
      </header>
    </div>
  );
}

export default App;
