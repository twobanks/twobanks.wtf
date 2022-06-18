import { v4 as uuid} from 'uuid';

const strava = '/icon/strava.svg'
const facebook = '/icon/facebook.svg'
const twitter = '/icon/twitter.svg'
const github = '/icon/github.svg'
const linkedin = '/icon/linkedin.svg'
const instagram = '/icon/instagram.svg'
const spotify = '/icon/spotify.svg'


export const social = [
  {
    id: uuid(),
    name: 'strava',
    link: 'https://www.strava.com/athletes/twobanks',
    icon: strava
  },
  {
    id: uuid(),
    name: 'facebook',
    link: 'https://www.facebook.com/twobanks/',
    icon: facebook
  },
  {
    id: uuid(),
    name: 'twitter',
    link: 'https://twitter.com/twobanks_',
    icon: twitter
  },
  {
    id: uuid(),
    name: 'github',
    link: 'https://github.com/twobanks',
    icon: github
  },
  {
    id: uuid(),
    name: 'linkedin',
    link: 'https://www.linkedin.com/in/twobanks/',
    icon: linkedin
  },
  {
    id: uuid(),
    name: 'instagram',
    link: 'https://www.instagram.com/twobanks/',
    icon: instagram
  },
  {
    id: uuid(),
    name: 'spotify',
    link: 'https://open.spotify.com/user/twobanks',
    icon: spotify
  },
]
