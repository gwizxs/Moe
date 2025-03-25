import { API_URL } from "shared/api/api_url";
import { baseInstanceV1 } from "shared/api/base";

//  ============= FETCH ANIME CATALOG RELEASES =============
export const getReleasesAnime = async () => (
    await baseInstanceV1.get(API_URL.releases_anime()
)).data

export const getReleasesAnimeLimit = async () => (
    await baseInstanceV1.get(API_URL.releases_anime_limit())
).data
