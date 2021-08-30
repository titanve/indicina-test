import React from "react";
import { usePopper } from "react-popper";
import { useHistory } from "react-router-dom";
import debounce from "lodash.debounce";
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
import { useFetchUsers, useFetchRepos } from "./hooks/hooksMain";

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
  const [, setAccess_token] = useAtom(accessTokenAtom);
  const [search, setSearch] = useAtom(searchAtom);
  const [currentUser] = useAtom(currentUserAtom);
  const [showMenu, setShowMenu] = useAtom(showMenuAtom);
  const [{ fetchGHUser }] = useFetchUsers();
  const [{ fetchGHRepos }] = useFetchRepos();

  const searchOnGh = () => {
    if (search != null && search.length > 0) {
      fetchGHUser(search);
      fetchGHRepos(search);
      history.push("/results");
    } else {
      setSearch("");
    }
  };

  const delayedQuery = React.useCallback(debounce(searchOnGh, 500), [search]);

  React.useEffect(() => {
    delayedQuery();

    // Cancel the debounce on useEffect cleanup.
    return delayedQuery.cancel;
  }, [delayedQuery]);

  const handleSearch = (event: any) => {
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
            data-testid='user-chevron'
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
              <p data-testid='logout-pane' className="App-User-logout" onClick={handleLogout}>
                Logout
              </p>
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
              className="App-Search-Input-icon"
            />
          </div>
          <input
            data-testid="input-search"
            className="App-Search-input"
            type="text"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <button onClick={delayedQuery} className="App-Search-button">
          Search Github
        </button>
      </main>
    </div>
  );
}

export { Search };
