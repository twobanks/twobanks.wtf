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
