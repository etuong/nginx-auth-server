import logo from "./logo.svg";

function App() {
  const backgroundColor = process.env.REACT_APP_COLOR ?? "#282c34";

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor }}>
        <img src={logo} className="App-logo" alt="logo" />
        <p>Create React App to demo Nginx Authentication</p>
      </header>
    </div>
  );
}

export default App;
