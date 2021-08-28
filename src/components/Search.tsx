import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
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
        <div className="App-Search-Input-arrange">
          <div className="App-Search-Input-icon-arrange">
            <FontAwesomeIcon
              icon={faSearch}
              className="App-Search-Input-icon"
            />
          </div>
          <input className="App-Search-input" type="text" />
        </div>
        <button className="App-Search-button">Search Github</button>
      </main>
    </div>
  );
}

export { Search };
