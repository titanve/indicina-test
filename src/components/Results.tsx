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
  usersResultsAtom,
  reposResultsAtom,
  searchResultsAtom,
} from "../jotai_state/main_state";
import { useFetchUsers, useFetchRepos } from "./hooks/hooksMain";
import { RepoItem } from "./RepoItem";
import { UserItem } from "./UserItem";

function Results() {
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
  const [, setUserResults] = useAtom(usersResultsAtom);
  const [, setReposResults] = useAtom(reposResultsAtom);
  const [searchResults, setSearchResults] = useAtom(searchResultsAtom);
  const [{ fetchGHUser, users }] = useFetchUsers();
  const [{ fetchGHRepos, repos }] = useFetchRepos();
  const [showRepos, setShowRepos] = React.useState(true);
  const [reposClass, setReposClass] = React.useState("App-Results-active-data");
  const [usersClass, setUsersClass] = React.useState(
    "App-Results-inactive-data"
  );

  const searchOnGh = () => {
    if (searchResults != null && searchResults.length > 0) {
      fetchGHUser(searchResults);
      fetchGHRepos(searchResults);
    } else {
      setSearchResults("");
    }
  };

  React.useEffect(() => {
    console.log("users", users);
    console.log("repos", repos);
    if (users != null && repos != null && search === "") {
      setUserResults(users);
      setReposResults(repos);
      history.push("/results");
    } else {
      setSearchResults(search);
      setSearch("");
    }
  }, [users, repos, setUserResults, history]);

  const delayedQuery = React.useCallback(debounce(searchOnGh, 500), [
    searchResults,
  ]);

  React.useEffect(() => {
    delayedQuery();

    // Cancel the debounce on useEffect cleanup.
    return delayedQuery.cancel;
  }, [delayedQuery]);

  const handleSearch = (event: any) => {
    setSearchResults(event.target.value);
  };

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    setAccess_token("");
    setShowMenu(false);
    history.push("/");
  };

  const handleChangeScope = () => {
    if (showRepos) {
      setReposClass("App-Results-inactive-data");
      setUsersClass("App-Results-active-data");
    } else {
      setReposClass("App-Results-active-data");
      setUsersClass("App-Results-inactive-data");
    }
    setShowRepos(!showRepos);
  };

  return (
    <div className="App">
      <main className="App-Results-main">
        <nav className="App-Results-nav">
          <div className="App-Results-logos">
            <img src={ghmark} className="App-logo-mark" alt="logo" />
            <img src={ghlogo} className="App-logo-img" alt="logo" />
          </div>
          <div className="App-Results-Input-arrange">
            <div className="App-Results-Input-icon-arrange">
              <FontAwesomeIcon
                icon={faSearch}
                className="App-Search-Input-icon"
              />
            </div>
            <input
              className="App-Search-input"
              type="text"
              placeholder="Search"
              value={searchResults}
              onChange={handleSearch}
            />
          </div>
          <div className="App-Results-User-arrange">
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
                <p className="App-User-logout" onClick={handleLogout}>
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
        </nav>
        <div className="App-Results-results-arrange">
          <div className="App-Results-results-count">
            <div
              onClick={!showRepos ? handleChangeScope : () => {}}
              className={reposClass}
            >
              <p>Repositories</p>
              <p className="App-Results-data-count">Count</p>
            </div>
            <div
              onClick={showRepos ? handleChangeScope : () => {}}
              className={usersClass}
            >
              <p>Users</p>
              <p className="App-Results-data-count">Count</p>
            </div>
          </div>
          <div className="App-Results-results-data">
            <div>2,985 repository results</div>
            {showRepos
              ? repos.map((repo, i) => {
                  return <RepoItem key={i} repo={repo} />;
                })
              : users.map((user, j) => {
                  return <UserItem key={j} user={user} />;
                })}
          </div>
        </div>
      </main>
    </div>
  );
}

export { Results };
