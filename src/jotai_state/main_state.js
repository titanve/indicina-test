import { atom } from "jotai";

const accessTokenAtom = atom("");
const searchAtom = atom("");
const currentUserAtom = atom({ login: "", avatarUrl: "", name: "" });
const showMenuAtom = atom(false);

export { accessTokenAtom, searchAtom, currentUserAtom, showMenuAtom };
