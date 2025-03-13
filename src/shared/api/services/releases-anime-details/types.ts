export interface ReleaseDetailsAnime {
    id: number;
    type: {
      value: string;
      description: string;
    };
    year: number;
    name: {
      main: string;
      english: string;
      alternative: string | null;
    };
    alias: string;
    season: {
      value: string;
      description: string;
    };
    poster: {
      src: string;
      thumbnail: string;
      optimized: {
        src: string;
        thumbnail: string;
      };
    };
    fresh_at: string;
    created_at: string;
    updated_at: string;
    is_ongoing: boolean;
    age_rating: {
      value: string;
      label: string;
      is_adult: boolean;
      description: string;
    };
    publish_day: {
      value: number;
      description: string;
    };
    description: string;
    notification: string | null;
    episodes_total: number | null;
    external_player: string | null;
    is_in_production: boolean;
    is_blocked_by_geo: boolean;
    episodes_are_unknown: boolean;
    is_blocked_by_copyrights: boolean;
    added_in_users_favorites: number;
    average_duration_of_episode: number | null;
    genres: Genre[];
    members: Member[];
    sponsor: string | null;
    episodes: Episode[];
    torrents: Torrent[];
  }
  
  interface Genre {
    id: number;
    name: string;
    image: {
      preview: string;
      thumbnail: string;
      optimized: {
        preview: string;
        thumbnail: string;
      };
    };
    total_releases: number;
  }
  
  interface Member {
    id: string;
    role: {
      value: string;
      description: string;
    };
    nickname: string;
    user: string | null;
  }
  
  export interface Episode {
    id: string;
    name: string;
    ordinal: number;
    opening: {
      stop: number;
      start: number;
    };
    ending: {
      stop: number;
      start: number;
    };
    preview: {
      src: string;
      thumbnail: string;
      optimized: {
        src: string;
        thumbnail: string;
      };
    };
    hls_480: string;
    hls_720: string;
    hls_1080: string;
    duration: number;
    rutube_id: string | null;
    youtube_id: string | null;
    updated_at: string;
    sort_order: number;
    name_english: string | null;
  }
  
  interface Torrent {
    id: number;
    hash: string;
    size: number;
    type: {
      value: string;
      description: string;
    };
    label: string;
    codec: {
      value: string;
      description: string;
    };
    color: {
      value: string;
      description: string;
    };
    magnet: string;
    seeders: number;
    quality: {
      value: string;
      description: string;
    };
    bitrate: number | null;
    filename: string;
    leechers: number;
    sort_order: number;
    created_at: string;
    updated_at: string;
    description: string;
    completed_times: number;
    release: ReleaseDetailsAnime;
  }
  