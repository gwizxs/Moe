import { Anime } from "../releases-anime-catalog/types";


export type SearchAnimeResponse = Omit<Anime, 'genres'>;