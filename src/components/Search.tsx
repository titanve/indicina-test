import React from "react";
import ghlogo from "./img/ghlogo.png";
import ghmark from "./img/ghmark.png";
import "../App.css";

function Search() {
  return (
    <div className="App">
      <main className="App-main">
        <div className="App-Search-logos">
          <img src={ghmark} className="App-logo-mark" alt="logo" />
          <img src={ghlogo} className="App-logo-img" alt="logo" />
        </div>
        <input className="App-Search-input" type="text" />
        <button className="App-login-button">Search Github</button>
      </main>
    </div>
  );
}

export { Search };
