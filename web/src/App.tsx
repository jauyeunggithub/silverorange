import React from 'react';
import axios from 'axios';
import RepoDetails, { Repo } from './RepoDetails';
import './App.css';

interface AxiosError {
  message: string;
}

export function App() {
  const [repos, setRepos] = React.useState([]);
  const [selectedLanguage, setSelectedLanguage] = React.useState('');
  const getData = async () => {
    try {
      const { data } = await axios.get('http://localhost:4000/repos');
      setRepos(data);
    } catch (error) {
      alert((error as AxiosError)?.message);
    }
  };

  const languages = React.useMemo(() => {
    const languagesWithDups = repos
      .map((r: Repo) => {
        return r.language;
      })
      .filter(Boolean);
    return languagesWithDups.filter(
      (l, index) => languagesWithDups.indexOf(l) === index
    );
  }, [repos]);

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      {languages.map((l) => (
        <button key={l} onClick={() => setSelectedLanguage(l)}>
          {l}
        </button>
      ))}
      <button onClick={() => setSelectedLanguage('')}>Clear Filters</button>
      {repos
        .filter((r: Repo) => {
          if (!selectedLanguage) {
            return true;
          }
          return r.language === selectedLanguage;
        })
        .sort((a: Repo, b: Repo) => {
          return (
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          );
        })
        .map((r: Repo) => {
          return <RepoDetails key={r.id} repo={r} />;
        })}
    </div>
  );
}
