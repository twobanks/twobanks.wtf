import { useEffect, useState } from 'react';

type Repositories = {
  default_branch: string;
  name: string;
  id: number;
  language: 'TypeScript' | 'JavaScript';
  updated_at: string;
  description: string;
  html_url: string;
}

export const userGitRepos = () => {
  const [repos, setRepos] = useState<Repositories[]>([]);
  const callRepos = `https://api.github.com/users/twobanks/repos`

  useEffect(() => {
    fetch(callRepos, {
      headers: new Headers({
        'User-agent': 'Mozilla/4.0 Custom User Agent'
      })
    })
    .then(res => res.json())
    .then(() => getUserGitRepos())
  }, [])

  function getUserGitRepos(){
    fetch(callRepos)
    .then(response => response.json())
    .then(data => setRepos(data))
  }
  return repos;
}
