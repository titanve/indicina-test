import { atom } from "jotai";

const accessTokenAtom = atom("");
const searchAtom = atom("");
const searchResultsAtom = atom("");
const currentUserAtom = atom({ login: "", avatarUrl: "", name: "" });
const showMenuAtom = atom(false);
const usersResultsAtom = atom([]);
const reposResultsAtom = atom([]);
const repositoryCountAtom = atom(0);
const userCountAtom = atom(0);
const pageInfoReposAtom = atom({ hasNextPage: false, endCursor: "" });
const pageInfoUsersAtom = atom({ hasNextPage: false, endCursor: "" });

export {
  accessTokenAtom,
  searchAtom,
  currentUserAtom,
  showMenuAtom,
  usersResultsAtom,
  reposResultsAtom,
  searchResultsAtom,
  repositoryCountAtom,
  userCountAtom,
  pageInfoReposAtom,
  pageInfoUsersAtom,
};
