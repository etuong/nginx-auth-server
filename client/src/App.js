import logo from "./logo.svg";
import { useContext } from "react";
import RbacContext from "./RbacContext";

const App = (props) => {
  const backgroundColor = process.env.REACT_APP_COLOR ?? "#282c34";
  const { rbac } = useContext(RbacContext);
  const isAllowed = rbac.isAllowed(props.user, "READ") === true;

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor }}>
        {isAllowed ? <img src={logo} className="App-logo" alt="logo" /> : null}
        <p>Create React App to demo Nginx Authentication</p>
      </header>
    </div>
  );
};

export default App;
