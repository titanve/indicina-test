import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ghlogo from "./img/ghlogo.png";
import ghmark from "./img/ghmark.png";
import "../App.css";
import { useAtom } from "jotai";
import {
  accessTokenAtom,
  searchAtom,
  currentUserAtom,
} from "../jotai_state/main_state";
import { GH_GraphQL } from "./utils/constants";

function Search() {
  const [access_token] = useAtom(accessTokenAtom);
  const [search, setSearch] = useAtom(searchAtom);
  const [currentUser] = useAtom(currentUserAtom);

  React.useEffect(() => {
    const fetchGH = async () => {
      const response = await fetch(GH_GraphQL, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          query: `query { 
          user(login: "${search}") {
            bio,
            avatarUrl
          }}`,
        }),
        // body: JSON.stringify({
        //   query: `query { viewer { login, name, avatarUrl }}`,
        // }),
      });
      const data = await response.json();
      console.log("data", data);
    };
    if (search != null && search.length > 0) {
      fetchGH();
    } else {
      setSearch("");
    }
  }, [search]);

  const handleSearch = (event: any) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  return (
    <div className="App">
      <main className="App-main">
        <div className="App-User-arrange">
          <img
            src={currentUser.avatarUrl}
            className="App-User-avatar"
            alt="logo"
          />
          <p className="App-User-name">{currentUser.name}</p>
        </div>
        <div className="App-Search-logos">
          <img src={ghmark} className="App-logo-mark" alt="logo" />
          <img src={ghlogo} className="App-logo-img" alt="logo" />
        </div>
        <div className="App-Search-Input-arrange">
          <div className="App-Search-Input-icon-arrange">
            <FontAwesomeIcon
              icon={faSearch}
              size="xs"
              className="App-Search-Input-icon"
            />
          </div>
          <input
            className="App-Search-input"
            type="text"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <button className="App-Search-button">Search Github</button>
      </main>
    </div>
  );
}

export { Search };
