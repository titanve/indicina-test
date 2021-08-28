import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAtom } from "jotai";
import { accessTokenAtom } from "../jotai_state/main_state";

const PrivateRoute: React.FC<{ path?: string }> = ({ children, ...rest }) => {
  const [access_token] = useAtom(accessTokenAtom);

  const has_access_token = () =>
    access_token != null && access_token.length > 0;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        has_access_token() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export { PrivateRoute };
