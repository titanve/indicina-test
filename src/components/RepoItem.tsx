import React from "react";
import "../App.css";

interface TotalCount {
  totalCount: number;
}

interface PrimaryLanguage {
  name: string;
}

interface Owner {
  login: string;
}

interface License {
  name: string;
}

interface Node {
  name: string;
  description: string;
  stargazers: TotalCount;
  primaryLanguage: PrimaryLanguage;
  updatedAt: string;
  owner: Owner;
  licenseInfo: License;
}

interface Repo {
  cursor: string;
  node: Node;
}

const RepoItem: React.FC<{ repo: Repo }> = (props) => {
  const repoLicense = () => {
    return props.repo.node.licenseInfo?.name != null
      ? props.repo.node.licenseInfo?.name
      : "License not defined";
  };

  const getDiffTime = () => {
    const date = new Date(props.repo.node.updatedAt); // some mock date
    const past: number = date.getTime();
    const now: number = new Date().getTime();
    const diff: number = now - past;
    const hours: number = diff / (1000 * 60 * 60);
    return hours < 24
      ? `${(hours).toFixed(0)} hours`
      : hours < (24 * 30)
      ? `${(hours / 24).toFixed(0)} days`
      : `${(hours / (24 * 30)).toFixed(0)} months`;
  };

  return (
    <div className="App-Results-detail">
      <div className="App-RepoItem-header">
        {props.repo.node.owner.login}/{props.repo.node.name}
      </div>
      <div className="App-RepoItem-description">
        {props.repo.node.description}
      </div>
      <div className="App-RepoItem-details">
        {`${props.repo.node.stargazers.totalCount} Stars | 
        ${props.repo.node.primaryLanguage?.name} | 
        ${repoLicense()} | 
        Updated ${getDiffTime()} ago`}
      </div>
    </div>
  );
};

export { RepoItem };
