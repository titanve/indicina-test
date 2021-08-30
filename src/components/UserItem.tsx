import React from "react";
import "../App.css";

interface Node {
  name: string;
  description: string;
  [key:string]: string;
}

interface User {
  cursor: string;
  node: Node;
}

const UserItem: React.FC<{ user: User }> = (props) =>{
  return <div className="App-Results-detail">
    <p>{props.user.node.name}</p>
    <p>{props.user.node.description}</p>
  </div>;
}

export { UserItem };
