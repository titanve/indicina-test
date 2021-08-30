import React from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useAtom } from "jotai";
import {
  repositoryCountAtom,
  userCountAtom,
  pageInfoReposAtom,
  pageInfoUsersAtom,
} from "../jotai_state/main_state";
import { useFetchUsers, useFetchRepos } from "./hooks/hooksMain";

const Pagination: React.FC<{ showRepos: boolean; searchResults: string }> = (
  props
) => {
  const [repositoryCount] = useAtom(repositoryCountAtom);
  const [userCount] = useAtom(userCountAtom);
  const [pageInfoRepos] = useAtom(pageInfoReposAtom);
  const [pageInfoUsers] = useAtom(pageInfoUsersAtom);
  const [{ fetchGHUser }] = useFetchUsers();
  const [{ fetchGHRepos }] = useFetchRepos();

  const shouldUsePagination = () => {
    return repositoryCount > 10 || userCount > 10;
  };

  const goToNextPage = () => {
    if (props.showRepos) {
      console.log("pageInfoRepos", pageInfoRepos);
      fetchGHRepos(props.searchResults, "", pageInfoRepos.endCursor);
    } else {
      console.log("pageInfoUsers", pageInfoUsers);
      fetchGHUser(props.searchResults, "", pageInfoUsers.endCursor);
    }
  };

  const goToPrevPage = () => {
    if (props.showRepos) {
      console.log("pageInfoRepos", pageInfoRepos);
      fetchGHRepos(props.searchResults, pageInfoRepos.startCursor, "");
    } else {
      console.log("pageInfoUsers", pageInfoUsers);
      fetchGHUser(props.searchResults, pageInfoUsers.startCursor, "");
    }
  };

  return shouldUsePagination() ? (
    <div className="App-Pagination">
      <div className="App-Pagination-chevron-inactive">
        <FontAwesomeIcon
          onClick={goToPrevPage}
          icon={faChevronLeft}
          size="xs"
        />
      </div>
      <div className="App-Pagination-chevron-active">
        <FontAwesomeIcon
          onClick={goToNextPage}
          icon={faChevronRight}
          size="xs"
        />
      </div>
    </div>
  ) : null;
};

export { Pagination };
