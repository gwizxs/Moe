interface IOptimizedImage {
  preview: string;
  thumbnail: string;
}

interface IImage {
  preview: string;
  thumbnail: string;
  optimized: IOptimizedImage;
}

interface IFranchise {
  id: string;
  name: string;
  image: IImage;
  rating: number | null;
  last_year: number;
  first_year: number;
  name_english: string;
  total_episodes: number;
  total_releases: number;
  total_duration: string;
  total_duration_in_seconds: number;
}

export type FranchisesResponse = IFranchise[];