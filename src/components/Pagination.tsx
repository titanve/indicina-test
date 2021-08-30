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
  const [pageRepos, setPageRepos] = React.useState(1);
  const [pageUsers, setPageUsers] = React.useState(1);

  const shouldUsePagination = () => {
    return repositoryCount > 10 || userCount > 10;
  };

  const reposPages = () => {
    return Math.ceil(repositoryCount / 10);
  };

  const usersPages = () => {
    return Math.ceil(userCount / 10);
  };

  const goToNextPage = () => {
    if (props.showRepos) {
      if (pageInfoRepos.hasNextPage) {
        fetchGHRepos(props.searchResults, "", pageInfoRepos.endCursor);
        setPageRepos((p) => p + 1);
      }
    } else {
      if (pageInfoUsers.hasNextPage) {
        fetchGHUser(props.searchResults, "", pageInfoUsers.endCursor);
        setPageUsers((p) => p + 1);
      }
    }
  };

  const goToPrevPage = () => {
    if (props.showRepos) {
      if (pageRepos > 1) {
        fetchGHRepos(props.searchResults, pageInfoRepos.startCursor, "");
        setPageRepos((p) => p - 1);
      }
    } else {
      if (pageUsers > 1) {
        fetchGHUser(props.searchResults, pageInfoUsers.startCursor, "");
        setPageUsers((p) => p - 1);
      }
    }
  };

  const currentNextClass = (): string => {
    if (props.showRepos) {
      return pageInfoRepos.hasNextPage
        ? `App-Pagination-chevron-active`
        : `App-Pagination-chevron-inactive`;
    } else {
      return pageInfoUsers.hasNextPage
        ? `App-Pagination-chevron-active`
        : `App-Pagination-chevron-inactive`;
    }
  };

  const currentPrevClass = (): string => {
    if (props.showRepos) {
      return pageRepos < 2
        ? `App-Pagination-chevron-inactive`
        : `App-Pagination-chevron-active`;
    } else {
      return pageUsers < 2
        ? `App-Pagination-chevron-inactive`
        : `App-Pagination-chevron-active`;
    }
  };

  return shouldUsePagination() ? (
    <div className="App-Pagination">
      <div className={currentPrevClass()}>
        <FontAwesomeIcon
          onClick={goToPrevPage}
          icon={faChevronLeft}
          size="xs"
        />
      </div>
      <div className="App-Pagination-pages">
        {props.showRepos
          ? `${pageRepos}/${reposPages()}`
          : `${pageUsers}/${usersPages()}`}
      </div>
      <div className={currentNextClass()}>
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
