export interface Anime {
  id: number;
  type: {
    value: string;
    description: string;
  };
  year: number;
  name: {
    main: string;
    english: string;
    alternative: string;
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
    value: string;
    description: string;
  };
  description: string;
  notification: string;
  episodes_total: number;
  external_player: string;
  is_in_production: boolean;
  is_blocked_by_geo: boolean;
  episodes_are_unknown: boolean;
  is_blocked_by_copyrights: boolean;
  added_in_users_favorites: number;
  average_duration_of_episode: number;
  genres: Array<{
    id: number;
    name: string;
    total_releases: number;
    image: {
      preview: string;
      thumbnail: string;
      optmized: {
        preview: string;
        thumbnail: string;
      };
    };
  }>;
}

export interface GetReleasesAnimeResponse {
  data: Anime[];
}
