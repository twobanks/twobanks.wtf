export type NowPlayingSong = {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
};

export type Track = {
  name: string;
  artists: {
    name: string;
  }[];
  external_urls: {
    spotify: string;
  };
};

export type TopTracks = {
  tracks: {
    songUrl: string;
    artist: string;
    title: string;
  }[];
};

export type Song = {
  is_playing: boolean,
  item: {
    title: string,
    name: string,
    artists: {
      name: string;
    }[],
    album: {
      name: string,
      images: {
        url: string,
      }[],
    },
    albumImageUrl: string,
    external_urls: {
      spotify: string,
    }
  }
}
