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
  repositoryCountAtom,
  userCountAtom,
} from "../jotai_state/main_state";
import { useFetchUsers, useFetchRepos } from "./hooks/hooksMain";
import { RepoItem } from "./RepoItem";
import { UserItem } from "./UserItem";
import { Pagination } from "./Pagination";
import type { Repo } from "./RepoItem";
import type { User } from "./UserItem";

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
  const [users] = useAtom(usersResultsAtom);
  const [repos] = useAtom(reposResultsAtom);
  const [searchResults, setSearchResults] = useAtom(searchResultsAtom);
  const [{ fetchGHUser }] = useFetchUsers();
  const [{ fetchGHRepos }] = useFetchRepos();
  const [showRepos, setShowRepos] = React.useState(true);
  const [reposClass, setReposClass] = React.useState("App-Results-active-data");
  const [usersClass, setUsersClass] = React.useState(
    "App-Results-inactive-data"
  );
  const [repositoryCount] = useAtom(repositoryCountAtom);
  const [userCount] = useAtom(userCountAtom);
  const [items, setItems] = React.useState<JSX.Element[]>([]);

  const searchOnGh = () => {
    if (searchResults != null && searchResults.length > 0) {
      fetchGHUser(searchResults);
      fetchGHRepos(searchResults);
    } else {
      setSearchResults("");
    }
  };

  React.useEffect(() => {
    if (search !== "") {
      setSearchResults(search);
      setSearch("");
    }
  }, []);

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

  React.useEffect(() => {
    const newItems: JSX.Element[] = showRepos
      ? repos.map((repo: Repo) => <RepoItem key={repo.cursor} repo={repo} />)
      : users.map((user: User) => <UserItem key={user.cursor} user={user} />);
    setItems([...newItems]);
  }, [repos, users, showRepos]);

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
              data-testid="input-results"
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
              data-testid="user-chevron"
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
                <p
                  data-testid="logout-pane"
                  className="App-User-logout"
                  onClick={handleLogout}
                >
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
              <p className="App-Results-data-count">
                {repositoryCount.toString(10).length > 3
                  ? `${repositoryCount
                      .toString(10)
                      .slice(0, repositoryCount.toString(10).length - 3)}k`
                  : repositoryCount}
              </p>
            </div>
            <div
              onClick={showRepos ? handleChangeScope : () => {}}
              className={usersClass}
            >
              <p>Users</p>
              <p className="App-Results-data-count">
                {userCount.toString(10).length > 3
                  ? `${userCount
                      .toString(10)
                      .slice(0, userCount.toString(10).length - 3)}k`
                  : userCount}
              </p>
            </div>
          </div>
          <div className="App-Results-results-data">
            <div className="App-Results-results-data-results">
              {`${
                showRepos
                  ? repositoryCount.toLocaleString()
                  : userCount.toLocaleString()
              } ${showRepos ? "repository results" : "users"}`}
            </div>
            <div>{items}</div>
          </div>
        </div>
        <Pagination showRepos={showRepos} searchResults={searchResults} />
      </main>
    </div>
  );
}

export { Results };
