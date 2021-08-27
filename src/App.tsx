import React from "react";
import "./App.css";
import LoginGithub from "react-login-github";

const onSuccess = (response: string) => {console.log(response)};
const onFailure = (response: string) => console.error(response);

function App() {
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
