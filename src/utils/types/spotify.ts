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
  url: string;
  artist: string;
  music: string;
  images: string;
  duration: number;
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
  url: string;
  name: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
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
  tracks: {
      href: string;
      total: number;
  };
  owner: string;
}

export type ListeningTypes = { isLoading: boolean; dataTopTracks?: TopTracks; artists?: { artists: Artist[] }; dataPlaylist?: { playlists: Playlists[] } }

export interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

export interface SpotifyEntityRaw {
  name: string;
  external_urls: { spotify: string };
  id: string;
}

export interface SpotifyArtistRaw extends SpotifyEntityRaw {
  genres: string[];
  images: SpotifyImage[];
}

export interface SpotifyAlbumRaw extends SpotifyEntityRaw {
  images: SpotifyImage[];
}

export interface SpotifyTrackRaw extends SpotifyEntityRaw {
  duration_ms: number;
  artists: SpotifyArtistRaw[];
  album: SpotifyAlbumRaw;
}

export interface SpotifyPlaylistRaw extends SpotifyEntityRaw {
  images: SpotifyImage[];
  owner: { display_name: string };
  tracks: {
    total: number;
    href: string;
  };
}

export interface SpotifyPaging<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
  href: string;
}

export interface DashboardData {
  tracks: TopTracks[];
  artists: Artist[];
  playlists: Playlists[];
}

export interface ListeningProps {
  initialTracks: TopTracks[];
  initialArtists: Artist[];
  initialPlaylists: Playlists[];
}

export type TabType = 'tracks' | 'artists' | 'playlists';
export interface PillStyle {
  left: number;
  width: number;
  opacity: number;
}

export interface SpotifyAuthToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export interface SpotifyError {
  error: {
    status: number;
    message: string;
  };
}