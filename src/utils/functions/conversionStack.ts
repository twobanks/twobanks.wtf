import { STACKS } from "../enums/stack";


export const conversionStack = (value: STACKS) => {
  const stack: { [index: string]: string } = {
    [STACKS.TYPESCRIPT]: 'TypeScript',
    [STACKS.JAVASCRIPT]: 'JavaScript',
    [STACKS.NEXT]: 'NextJS',
    [STACKS.GATSBY]: 'GatsbyJS',
    [STACKS.STYLED]: 'styled-components',
  }
  return stack[value];
}
