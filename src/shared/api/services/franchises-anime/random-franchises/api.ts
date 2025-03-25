import { API_URL } from "shared/api/api_url";
import { baseInstanceV1 } from "shared/api/base";

//  ============= FETCH RANDOM FRANCHISES ANIME =============
export const getRandomFranchisesAnime = async () => (
    await baseInstanceV1.get(API_URL.franchises_random())
).data;

