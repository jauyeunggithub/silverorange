import React from 'react';

interface Owner {
  login: string;
}

export interface Repo {
  id: string;
  name: string;
  owner: Owner;
  description: string;
  language: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  updated_at: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  forks_count: number;
  [key: string]: any;
}

interface Props {
  repo: Repo;
}

/* eslint-disable @typescript-eslint/naming-convention */
const RepoDetails: React.FC<Props> = ({ repo }) => {
  const {
    name,
    owner: { login },
    updated_at: updatedAt,
    description,
    language,
    forks_count: forksCount,
  } = repo;
  const [showDetails, setShowDetails] = React.useState<boolean>(false);

  return (
    <>
      <h1 className="details" onClick={() => setShowDetails((s) => !s)}>
        {name}
      </h1>
      <div>Language: {language}</div>
      <div>Forks count: {forksCount}</div>
      <div>Description: {description}</div>
      {showDetails && (
        <section>
          <div>Commit date: {updatedAt}</div>
          <div>Author: {login}</div>
          <div>Message: {description}</div>
        </section>
      )}
    </>
  );
};

export default RepoDetails;
