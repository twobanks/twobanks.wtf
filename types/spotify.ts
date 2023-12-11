export type NowPlayingSong = {
  isPlaying: boolean;
  artist: string;
  music: string;
  url: string;
  image: string;
};

export type Track = {
  name: string;
  artists: {
    name: string;
  }[];
  external_urls: {
    spotify: string;
  };
  album: {
    images: {
      url: string,
    }[];
  }
};

export type TopTracks = {
  tracks: {
    url: string;
    artist: string;
    music: string;
    images: string;
  }[];
};

export type Song = {
  is_playing: boolean;
  item: Track;
}

export type Artists = {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}[]

export type Artist = {
  href: string;
  name: string;
  images: {
    height: number;
    url: string;
    width: number;
  }
  genres: string[];
}