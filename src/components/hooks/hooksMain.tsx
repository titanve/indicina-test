import React from "react";
import { useAtom } from "jotai";
import { accessTokenAtom } from "../../jotai_state/main_state";
import { GH_GraphQL } from "../utils/constants";

const useFetchUsers = () => {
  const [users, setUsers] = React.useState([]);
  const [access_token] = useAtom(accessTokenAtom);

  const fetchGHUser = async (query: string) => {
    const response = await fetch(GH_GraphQL, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        query: `{
          search(query: "${query} in:login", type: USER, first: 10) {
            userCount
            pageInfo {
              hasNextPage
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
    const data = await response.json()
    setUsers(data.data.search?.edges);
  };

  return [{ fetchGHUser, users }];
};

const useFetchRepos = () => {
  const [repos, setRepos] = React.useState([]);
  const [access_token] = useAtom(accessTokenAtom);

  const fetchGHRepos = async (query: string) => {
    const response = await fetch(GH_GraphQL, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        query: `{
          search(query: "${query} in:name", type: REPOSITORY, first: 10) {
            repositoryCount
            pageInfo {
              hasNextPage
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
    setRepos(data.data.search?.edges);
  };

  return [{ fetchGHRepos, repos }];
};

export { useFetchUsers, useFetchRepos };
