<p align="center">
  <img src="https://raw.githubusercontent.com/twobanks/twobanks.wtf/603bd22f645b33d0c77f97a438457c845a5a91ed/public/img/twobanks.svg" width="500" alt="twobanks">
</p>


What's up!! <img src="https://raw.githubusercontent.com/kaueMarques/kaueMarques/master/hi.gif" width="30px">

## Overview

- `public/*` - Static assets including, texts, icons and images.
- `src/*` - All source.
- `src/components/*` - All components used: `Banks`, `Footer`, `Header`, `Icon`, `Menu`, `NowPlaying`, `Strava`, `Title`..
- `src/images` - File with import of all images.
- `src/pages/*` - All other static pages.
- `src/pages/about/*` - Static pages about me.
- `src/pages/activities/*` - Page with activities loaded on strava.
- `src/pages/works/*` - Static page with used projects and stacks.
- `src/pages/snippets/*` - Static pre-rendered snippets pages.
- `src/styles/*` - Global styles and theme.
- `src/templates/*` - The different page layouts.
- `src/types/*` - Types created.
- `src/utils/*` - A collection of helpful utilities or code for external services.


## Running Locally

This application requires Node.js v16.13+.

```bash
git clone https://github.com/twobanks/twobanks.wtf.git
cd twobanks.wtf
yarn install
yarn dev
```

Create a `.env` file similar to [`.env.example`](https://github.com/twobanks/twobanks.wtf/blob/VDM/.env.example).


##   Techs

- [TypeScript](https://www.typescriptlang.org/) - *for static type checking*
- [NextJS](https://nextjs.org/) - *framework react*
- [Vercel](https://vercel.com/) - *deploy*
- [styled-component](https://styled-components.com/) - *CSS for styling React component*
- [styled-media-query](https://github.com/morajabi/styled-media-query) - *@media for styled-components*
- [SWR](https://swr.vercel.app/) - *hooks for data fetching*
- [ESLint](https://eslint.org/) - *for code linting*
- [Prettier](https://prettier.io/) - *for code formatting*
