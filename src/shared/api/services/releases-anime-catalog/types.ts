    type Anime = {
        id: number;
        type: string;
        year: number;
        name: string;
        alias: string;
        season: string;
        poster: string;
        isOngoing: boolean;
        ageRating: string;
        publishDay: string;
        episodesTotal: number;
        averageDuration: number;
        genres: string[];
      };

      export interface GetReleasesAnimeResponse {
        data: Anime[];
    }

    //   const response: ApiResponse = {
    //     data: [
    //       {
    //         id: 9821,
    //         type: "TV",
    //         year: 2024,
    //         name: "О движении Земли",
    //         alias: "chi-chikyuu-no-undou-ni-tsuite",
    //         season: "autumn",
    //         poster: "/storage/releases/posters/9821/A5pVpdtZP5v7buxh8zc2KCyzCe8tua0a.webp",
    //         isOngoing: true,
    //         ageRating: "16+",
    //         publishDay: "Среда",
    //         episodesTotal: 24,
    //         averageDuration: 25,
    //         genres: ["Сейнен", "Драма", "Исторический"],
    //       },
    //     ],
    //   };
    