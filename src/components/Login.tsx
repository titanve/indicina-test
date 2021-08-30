import React from "react";
import "../App.css";
import LoginGithub from "react-login-github";
import { useHistory } from "react-router-dom";
import { useAtom } from "jotai";
import { accessTokenAtom, currentUserAtom } from "../jotai_state/main_state";
import { GH_GraphQL } from "./utils/constants";

const API_Auth_Backend: string =
  "https://9uj0ihoex6.execute-api.eu-west-1.amazonaws.com/dev/auth";

interface AuthResponse {
  code: string;
}

function Login() {
  let history = useHistory();
  const [code, setCode] = React.useState("");
  const [access_token, setAccess_token] = useAtom(accessTokenAtom);
  const [, setCurrentUser] = useAtom(currentUserAtom);

  const onSuccess = (response: AuthResponse) => {
    setCode(response?.code);
  };

  const onFailure = (response: string) => {
    console.error(response);
  };

  React.useEffect(() => {
    const fetchAccessToken = async () => {
      const response = await fetch(API_Auth_Backend, {
        method: "POST",
        body: JSON.stringify({ code: code }),
      });
      const { data } = await response.json();
      if (response.ok) {
        setAccess_token(data?.access_token);
      }
    };

    if (code != null && code.length > 0) {
      fetchAccessToken();
    }
  }, [code]);

  React.useEffect(() => {
    if (access_token != null && access_token.length > 0) {
      const fetchGH = async () => {
        const response = await fetch(GH_GraphQL, {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "content-type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            query: "query { viewer { login, name, avatarUrl }}",
          }),
        });
        const { data } = await response.json();
        setCurrentUser({
          login: data?.viewer.login,
          avatarUrl: data?.viewer.avatarUrl,
          name: data?.viewer.name,
        });
        history.push("/search");
      };
      fetchGH();
    }
  }, [access_token, setCurrentUser, history]);

  return (
    <div className="App">
      <main className="App-main">
        <LoginGithub
          clientId="4f262cc9e20d3043da02"
          className="App-login-button"
          buttonText="Login to Github"
          onSuccess={onSuccess}
          onFailure={onFailure}
        />
      </main>
    </div>
  );
}

export { Login };
