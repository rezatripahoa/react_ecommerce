import logo from "./logo.svg";
import "./App.css";

function Header({ name }) {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      React Lesson : {name}
    </header>
  );
}

function App() {
  return (
    <div className="App">
      <Header name="Reza Tri" />
    </div>
  );
}

export default App;