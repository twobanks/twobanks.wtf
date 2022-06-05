import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import Works from '../templates/Works'
import { Repositories } from '../types/git';
import { CALL_REPOS } from '../utils/constants/git';

const WorksPage: NextPage = () => {
  const [repositories, setRepositories] = useState<Repositories[]>([]);
  useEffect(() => {
    fetch(CALL_REPOS, {
      headers: new Headers({
        'User-agent': 'Mozilla/4.0 Custom User Agent'
      })
    })
    .then(res => res.json())
    .then(() => getUserGitRepos())
  }, [])

  function getUserGitRepos(){
    fetch(CALL_REPOS)
    .then(response => response.json())
    .then(data => setRepositories(data))
  }
  return <Works repositories={repositories}/>
}

export default WorksPage
