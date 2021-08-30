import React from "react";
import { atom } from "jotai";
import type { Repo } from "../components/RepoItem";
import type { User } from "../components/UserItem";

const accessTokenAtom = atom("");
const searchAtom = atom("");
const searchResultsAtom = atom("");
const currentUserAtom = atom({ login: "", avatarUrl: "", name: "" });
const showMenuAtom = atom(false);
const usersResultsAtom = atom<User[]>([]);
const reposResultsAtom = atom<Repo[]>([]);
const repositoryCountAtom = atom(0);
const userCountAtom = atom(0);
const pageInfoReposAtom = atom({
  hasNextPage: false,
  startCursor: "",
  endCursor: "",
});
const pageInfoUsersAtom = atom({
  hasNextPage: false,
  startCursor: "",
  endCursor: "",
});

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
