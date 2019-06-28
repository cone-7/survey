import React from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/Form';
import jsonForm from './formsConfig/form';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Form config={jsonForm}></Form>
    </div>
  );
}

export default App;
