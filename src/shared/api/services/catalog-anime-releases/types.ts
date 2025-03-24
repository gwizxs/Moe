export interface AnimeGenreImage {
  preview: string;
  thumbnail: string;
  optimized: {
    preview: string;
    thumbnail: string;
  };
}

export interface AnimeGenre {
  id: number;
  name: string;
  image: AnimeGenreImage;
  total_releases: number;
}

export interface AnimePoster {
  src: string;
  thumbnail: string;
  optimized: {
    src: string;
    thumbnail: string;
  };
}

export interface AnimeType {
  value: string;
  description: string;
}

export interface AnimeName {
  main: string;
  english: string;
  alternative: string | null;
}

export interface AnimeSeason {
  value: string;
  description: string;
}

export interface AnimeAgeRating {
  value: string;
  label: string;
  is_adult: boolean;
  description: string;
}

export interface AnimePublishDay {
  value: number;
  description: string;
}

export interface Anime {
  id: number;
  type: AnimeType;
  year: number;
  name: AnimeName;
  alias: string;
  season: AnimeSeason;
  poster: AnimePoster;
  fresh_at: string;
  created_at: string;
  updated_at: string;
  is_ongoing: boolean;
  age_rating: AnimeAgeRating;
  publish_day: AnimePublishDay;
  description: string;
  notification: string | null;
  episodes_total: number;
  external_player: string | null;
  is_in_production: boolean;
  is_blocked_by_geo: boolean;
  episodes_are_unknown: boolean;
  is_blocked_by_copyrights: boolean;
  added_in_users_favorites: number;
  average_duration_of_episode: number;
  genres: AnimeGenre[];
}

export interface PaginationLinks {
  next: string;
}

export interface PaginationMeta {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  links: PaginationLinks;
}

export interface AnimeResponse {
  data: Anime[];
}