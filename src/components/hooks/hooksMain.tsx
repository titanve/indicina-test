import React from "react";
import { useAtom } from "jotai";
import {
  accessTokenAtom,
  reposResultsAtom,
  usersResultsAtom,
  repositoryCountAtom,
  userCountAtom,
  pageInfoReposAtom,
  pageInfoUsersAtom,
} from "../../jotai_state/main_state";
import { GH_GraphQL } from "../utils/constants";

const useFetchUsers = () => {
  const [access_token] = useAtom(accessTokenAtom);
  const [, setUsers] = useAtom(usersResultsAtom);
  const [, setUserCount] = useAtom(userCountAtom);
  const [, setPageInfoUsers] = useAtom(pageInfoUsersAtom);

  const fetchGHUser = async (
    query: string,
    prev: string = "",
    next: string = ""
  ) => {
    const prevQuery = prev.length > 0 ? `, before:"${prev}"` : "";
    const nextQuery = next.length > 0 ? `, after:"${next}"` : "";
    const newOrder =
      prev.length === 0 && next.length === 0
        ? "first:10"
        : prev.length > 0
        ? "last:10"
        : "first:10";
    const response = await fetch(GH_GraphQL, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        query: `{
          search(query:"${query} in:login", type:USER, ${newOrder}${prevQuery}${nextQuery}) {
            userCount
            pageInfo {
              hasNextPage
              startCursor
              endCursor
            }
            edges {
              cursor
              node {
                ... on User {
                  login
                  bio
                  name
                  updatedAt
                }
              }
            }
          }
        }`,
      }),
    });
    const data = await response.json();
    setUsers([...data.data.search?.edges]);
    setPageInfoUsers(data.data.search?.pageInfo);
    setUserCount(data.data.search?.userCount);
  };

  return [{ fetchGHUser }];
};

const useFetchRepos = () => {
  const [access_token] = useAtom(accessTokenAtom);
  const [, setRepos] = useAtom(reposResultsAtom);
  const [, setRepositoryCount] = useAtom(repositoryCountAtom);
  const [, setPageInfoRepos] = useAtom(pageInfoReposAtom);

  const fetchGHRepos = async (
    query: string,
    prev: string = "",
    next: string = ""
  ) => {
    const prevQuery = prev.length > 0 ? `, before:"${prev}"` : "";
    const nextQuery = next.length > 0 ? `, after:"${next}"` : "";
    const newOrder =
      prev.length === 0 && next.length === 0
        ? "first:10"
        : prev.length > 0
        ? "last:10"
        : "first:10";
    const response = await fetch(GH_GraphQL, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        query: `{
          search(query:"${query} in:login", type:REPOSITORY, ${newOrder}${prevQuery}${nextQuery}) {
            repositoryCount
            pageInfo {
              hasNextPage
              startCursor
              endCursor
            }
            edges {
              cursor
              node {
                ... on Repository {
                  name
                  owner {
                    login
                  }
                  description
                  licenseInfo {
                    name
                  }
                  stargazers {
                    totalCount
                  }
                  primaryLanguage {
                    name
                  }
                  updatedAt
                }
              }
            }
          }
        }`,
      }),
    });
    const data = await response.json();
    setRepos([...data.data.search?.edges]);
    setPageInfoRepos(data.data.search?.pageInfo);
    setRepositoryCount(data.data.search?.repositoryCount);
  };

  return [{ fetchGHRepos }];
};

export { useFetchUsers, useFetchRepos };
