import Wrapper from '../Wrapper';
import * as S from './styled'
import { userGitRepos } from '../../hooks/useGit'
import { useState } from 'react';



/* default_branch: string;
  name: string;
  id: number;
  language: string;
  updated_at: string;
  description: string;
  html_url: string; */

const Works = () => {
  const repositories = userGitRepos();
  console.log("repos", repositories);

  return (
    <Wrapper>
      <S.Content>
        <S.WorkHeader>
          <ul>
            {repositories?.map(item => {
              return (
                <S.Repos key={item.name} type={item.language}>
                  <a href={item.html_url}>
                    <strong>{item.name}</strong>
                    <span>{item.language}</span>
                    {item.description && <p>{item.description}</p>}
                  </a>
                </S.Repos>
              )
            })}
          </ul>
        </S.WorkHeader>
      </S.Content>
    </Wrapper>
  )
}

export default Works;
