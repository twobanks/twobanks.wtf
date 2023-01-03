import { STACKS } from "../enums/stack";

export const conversionStack = (value: STACKS) => {
  const stack: { [index: string]: string } = {
    [STACKS.TYPESCRIPT]: 'TypeScript',
    [STACKS.REACT]: 'ReactJS',
    [STACKS.JAVASCRIPT]: 'JavaScript(ES6)',
    [STACKS.NEXT]: 'NextJS',
    [STACKS.GATSBY]: 'GatsbyJS',
    [STACKS.STYLED]: 'styled-components',
    [STACKS.HTML]: 'HTML5/CSS3',
    [STACKS.REACT_TESTING]: 'React Testing Library',
    [STACKS.JEST]: 'Jest',
    [STACKS.PHP]: 'PHP'
  }
  return stack[value];
}
