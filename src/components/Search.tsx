import React from "react";
import { usePopper } from "react-popper";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import ghlogo from "./img/ghlogo.png";
import ghmark from "./img/ghmark.png";
import "../App.css";
import { useAtom } from "jotai";
import {
  accessTokenAtom,
  searchAtom,
  currentUserAtom,
  showMenuAtom,
} from "../jotai_state/main_state";
import { GH_GraphQL } from "./utils/constants";

function Search() {
  let history = useHistory();
  const [referenceElement, setReferenceElement] =
    React.useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] =
    React.useState<HTMLDivElement | null>(null);
  const [arrowElement, setArrowElement] = React.useState<HTMLDivElement | null>(
    null
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: "arrow",
        options: {
          element: arrowElement,
        },
      },
      {
        name: "offset",
        options: {
          offset: [-90, 25], // x, y
        },
      },
    ],
  });
  const [access_token, setAccess_token] = useAtom(accessTokenAtom);
  const [search, setSearch] = useAtom(searchAtom);
  const [currentUser] = useAtom(currentUserAtom);
  const [showMenu, setShowMenu] = useAtom(showMenuAtom);

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

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    setAccess_token("");
    setShowMenu(false);
    history.push("/");
  };

  return (
    <div className="App">
      <main className="App-Search-main">
        <div className="App-User-arrange">
          <img
            src={currentUser.avatarUrl}
            className="App-User-avatar"
            alt="logo"
          />
          <p className="App-User-name">{currentUser.name}</p>
          <div
            className="App-Search-Chevron"
            onClick={handleShowMenu}
            ref={setReferenceElement}
          >
            <FontAwesomeIcon
              icon={showMenu ? faChevronDown : faChevronUp}
              size="xs"
            />
          </div>
          {showMenu ? (
            <div
              className="App-User-popper"
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
            >
              <p className="App-User-logout" onClick={handleLogout}>Logout</p>
              <div
                className="App-User-popper-arrow"
                ref={setArrowElement}
                style={styles.arrow}
              />
            </div>
          ) : null}
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
