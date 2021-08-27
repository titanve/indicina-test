import React from "react";
import "./App.css";
import LoginGithub from "react-login-github";
import { useAtom } from "jotai";
import { accessTokenAtom } from "./jotai_state/main_state";

const API_Auth_Backend: string =
  "https://9uj0ihoex6.execute-api.eu-west-1.amazonaws.com/dev/auth";

interface AuthResponse {
  code: string;
}

function App() {
  const [code, setCode] = React.useState("");
  const [access_token, setAccess_token] = useAtom(accessTokenAtom);

  const onSuccess = (response: AuthResponse) => {
    setCode(response?.code);
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

    if (code != null) {
      fetchAccessToken();
    }
  }, [code]);

  React.useEffect(() => {
    if (access_token != null && access_token.length > 0) {
      // TODO: go to the search page
    }
  }, [access_token]);

  const onFailure = (response: string) => console.error(response);

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

export { App };
