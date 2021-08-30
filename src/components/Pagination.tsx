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

const Pagination = () => {
  const [repositoryCount] = useAtom(repositoryCountAtom);
  const [userCount] = useAtom(userCountAtom);
  const [pageInfoRepos, setPageInfoRepos] = useAtom(pageInfoReposAtom);
  const [pageInfoUsers, setPageInfoUsers] = useAtom(pageInfoUsersAtom);

  const shouldUsePagination = () => {
    return repositoryCount > 10 || userCount > 10;
  };

  const goToNextPage = () => {};

  const goToPrevPage = () => {};

  return shouldUsePagination() ? (
    <div className="App-Pagination">
      <div className="App-Pagination-chevron-inactive">
        <FontAwesomeIcon
          onClick={goToNextPage}
          icon={faChevronLeft}
          size="xs"
        />
      </div>
      <div className="App-Pagination-chevron-active">
        <FontAwesomeIcon
          onClick={goToPrevPage}
          icon={faChevronRight}
          size="xs"
        />
      </div>
    </div>
  ) : null;
};

export { Pagination };
