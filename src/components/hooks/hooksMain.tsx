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
        query: `query { 
        user(login: "${query}") {
          bio,
          avatarUrl
        }}`,
      }),
    });
    const { data } = await response.json();
    setUsers(data);
  };

  return [{ fetchGHUser, users }];
};

export { useFetchUsers };
