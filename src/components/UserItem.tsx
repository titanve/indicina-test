import React from "react";
import "../App.css";

interface Node {
  name: string;
  bio: string;
  login: string;
}

interface User {
  cursor: string;
  node: Node;
}

const UserItem: React.FC<{ user: User }> = (props) => {
  return (
    <div className="App-Results-detail">
      <div className="App-UserItem-header">
        <div className="App-UserItem-name">{props.user.node.name}</div>
        <div className="App-UserItem-login">{props.user.node.login}</div>
      </div>
      <div className="App-UserItem-bio">{props.user.node.bio}</div>
    </div>
  );
};

export { UserItem };
export type { User };
