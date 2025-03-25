import { API_URL } from "shared/api/api_url";
import { baseInstanceV1 } from "shared/api/base";

//  ============= FETCH ALL FRANCHISES ANIME =============
export const getAllFranchisesAnime = async () => (
    await baseInstanceV1.get(API_URL.franchises_all())
).data;

