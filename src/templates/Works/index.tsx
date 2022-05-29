import Wrapper from '../Wrapper';
import * as S from './styled'
import { userGitRepos } from '../../hooks/useGit'
import { ReactNode, useState } from 'react';

const iconRepo = '/img/repo.svg';

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
  const Animation = (props: { index: string; children: ReactNode }) => {
    const [hovered, setHovered] = useState('')
    const isHovered = hovered === props.index

    return (
      <S.AnimContainer
        onHoverStart={() => setHovered(props.index)}
        onHoverEnd={() => setHovered('')}
      >
        {isHovered && (
          <S.AnimHovered
            layoutId="listItem"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}

        {props.children}
      </S.AnimContainer>
    )
  }

  return (
    <Wrapper>
      <S.Content>
        <S.WorkHeader>
          <ul>
            {repositories?.map((item, index) => {
              return (
                <S.Repos key={item.name} type={item.language}>
                  <a href={item.html_url}>
                    <Animation index={String(index)}>
                      <S.Title>
                        <img src={iconRepo} alt=""/>
                        <strong>{item.name}</strong>
                      </S.Title>
                      <span>{item.language}</span>
                      {item.description && <p>{item.description}</p>}
                    </Animation>
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
