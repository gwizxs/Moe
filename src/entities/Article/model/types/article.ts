

export enum ArticleView {
    BIG = 'BIG',
    SMALL = 'SMALL'
}


type Season = {
    value: string;
    description: string;
};

type Type = {
    value: string;
    description: string;
}

 type age_rating = {
    value: string,
    label: string,
    is_adult: boolean,
    description: string;
  }

  type name = {
    main: string;
    english: string;
    alternative: string | null;
  }

  type Poster = {
    src: string;
    thumbnail: string;
    optimized: {
        src: string;
        thumbnail: string;
    };
};

type publishDay = {
    value: string;
    description: string;
}

type Genre = {
    id: number;
    name: string;
    totalReleases: number;
    image: {
        preview: string;
        thumbnail: string;
        optimized: {
            preview: string;
            thumbnail: string;
        };
    };
};
export interface Article {
    id: number;
    type: Type;
    year: number;
    name: name;
    alias: string;
    season: Season;
    poster: Poster;
    isOngoing: boolean;
    ageRating: age_rating;
    publishDay: publishDay;
    episodesTotal: number;
    averageDuration: number;
    genres: Genre[];
  };

  