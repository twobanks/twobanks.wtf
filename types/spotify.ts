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

export type Playlist = {
  collaborative: boolean;
  description: string;
  external_urls: {
      spotify: string;
  },
  href: string;
  id: string;
  images: [
      {
          height: number;
          url: string;
          width: number;
      }
  ],
  name: string;
  owner: {
      display_name: string;
      external_urls: {
          spotify: string;
      },
      href: string;
      id: string;
      type:string;
      uri: string;
  },
  primary_color: string;
  public: boolean;
  snapshot_id: string;
  tracks: {
      href: string;
      total: number;
  },
  type: string;
  uri: string;
}

export type Playlists = {
  total: number;
  url: string;
  name: string;
  images: string;
}