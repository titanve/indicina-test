import React from "react";
import { useAtom } from "jotai";
import {
  accessTokenAtom,
  repositoryCountAtom,
  userCountAtom,
  pageInfoReposAtom,
  pageInfoUsersAtom,
} from "../../jotai_state/main_state";
import { GH_GraphQL } from "../utils/constants";

const useFetchUsers = () => {
  const [users, setUsers] = React.useState([]);
  const [access_token] = useAtom(accessTokenAtom);
  const [, setUserCount] = useAtom(userCountAtom);
  const [, setPageInfoUsers] = useAtom(pageInfoUsersAtom);

  const fetchGHUser = async (
    query: string,
    prev: string = "",
    next: string = ""
  ) => {
    const prevQuery = prev.length > 0 ? ` before: "${prev}",` : "";
    const nextQuery = next.length > 0 ? ` after: "${next}",` : "";
    const response = await fetch(GH_GraphQL, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        query: `{
          search(query: "${query} in:login", type: USER,${prevQuery}${nextQuery} first: 10) {
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
    console.log("data Users", data.data)
    setUsers(data.data.search?.edges);
    setPageInfoUsers(data.data.search?.pageInfo);
    setUserCount(data.data.search?.userCount);
  };

  return [{ fetchGHUser, users }];
};

const useFetchRepos = () => {
  const [repos, setRepos] = React.useState([]);
  const [access_token] = useAtom(accessTokenAtom);
  const [, setRepositoryCount] = useAtom(repositoryCountAtom);
  const [, setPageInfoRepos] = useAtom(pageInfoReposAtom);

  const fetchGHRepos = async (
    query: string,
    prev: string = "",
    next: string = ""
  ) => {
    const prevQuery = prev.length > 0 ? ` before: "${prev}",` : "";
    const nextQuery = next.length > 0 ? ` after: "${next}",` : "";
    const response = await fetch(GH_GraphQL, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        query: `{
          search(query: "${query} in:name", type: REPOSITORY,${prevQuery}${nextQuery} first: 10) {
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
    console.log("data Repos", data.data)
    setRepos(data.data.search?.edges);
    setPageInfoRepos(data.data.search?.pageInfo);
    setRepositoryCount(data.data.search?.repositoryCount);
  };

  return [{ fetchGHRepos, repos }];
};

export { useFetchUsers, useFetchRepos };
