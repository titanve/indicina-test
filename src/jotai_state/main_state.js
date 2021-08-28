import { atom } from "jotai";

const accessTokenAtom = atom("");
const searchAtom = atom("");
const currentUserAtom = atom({login: '', avatarUrl: '', name: ''});

export { accessTokenAtom, searchAtom, currentUserAtom };
