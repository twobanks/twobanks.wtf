import { useEffect, useState } from 'react';

export const userGit = () => {
  const [user, setUser] = useState();
  const callAthlete = `https://api.github.com/users/twobanks`

  useEffect(() => {
    fetch(callAthlete, {
      headers: new Headers({
        'User-agent': 'Mozilla/4.0 Custom User Agent'
      })
    })
    .then(res => res.json())
    .then(() => getUserGit())
  }, [])

  function getUserGit(){
    fetch(callAthlete)
    .then(response => response.json())
    .then(data => setUser(data))
  }
  return user;
}

export const userGitRepos = () => {
  const [repos, setRepos] = useState();
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
