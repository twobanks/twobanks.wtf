<p align="center">
  <img src="https://raw.githubusercontent.com/twobanks/twobanks.wtf/603bd22f645b33d0c77f97a438457c845a5a91ed/public/img/twobanks.svg" width="500" alt="twobanks">
</p>


What's up!! <img src="https://raw.githubusercontent.com/kaueMarques/kaueMarques/master/hi.gif" width="30px">

## Overview

- `public/*` - Static assets including, texts, icons and images.
- `components/*` - All components used: `Footer`, `Header`, `Menu`, `ListeningNow`, `Strava`, `Title`, `TopTracks`
- `pages/*` - All other static pages.
- `pages/sobre` - Static pages about me.
- `pages/activities` - Page with activities loaded on strava.
- `pages/ouvindo` - Static page with used songs spotify.
- `pages/trampos` - Static page with used projects and stacks.
- `pages/snippets/*` - Static pre-rendered snippets pages.
- `styles/*` - Global styles and theme.
- `templates/*` - The different page layouts.
- `types/*` - Types created.
- `utils/*` - A collection of helpful utilities or code for external services.


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
- [SWR](https://swr.vercel.app/) - *hooks for data fetching*
- [ESLint](https://eslint.org/) - *for code linting*
- [Prettier](https://prettier.io/) - *for code formatting*

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/project?template=https://github.com/twobanks/twobanks.wtf/tree/VDM&project-name=twobanks.wtf&repository-name=twobanks.wtf)
