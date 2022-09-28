import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import App from "./App";
import About from "./About";
import Image from "./assets/image.jpeg";

import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";

const Contact = () => (
  <>
    <h1>Contact Me</h1>
    <img src={Image} alt="" />
  </>
);

const NotFound = () => <h1>The page your looking for not found</h1>;

const Navbar = () => (
  <ul>
    <li>
      <NavLink to="/">Home</NavLink>
    </li>
    <li>
      <NavLink to="/about">About</NavLink>
    </li>
    <li>
      <NavLink to="/contact">Contact</NavLink>
    </li>
  </ul>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route element={<NotFound />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={<App />} />
        </Routes>
      </div>
    </Router>
  </React.StrictMode>
);
