import { atom } from "jotai";

const accessTokenAtom = atom("");
const searchAtom = atom("");
const searchResultsAtom = atom("");
const currentUserAtom = atom({ login: "", avatarUrl: "", name: "" });
const showMenuAtom = atom(false);
const usersResultsAtom = atom([]);
const reposResultsAtom = atom([]);

export {
  accessTokenAtom,
  searchAtom,
  currentUserAtom,
  showMenuAtom,
  usersResultsAtom,
  reposResultsAtom,
  searchResultsAtom,
};
