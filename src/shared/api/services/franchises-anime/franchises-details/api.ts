import { API_URL } from "shared/api/api_url";
import { baseInstanceV1 } from "shared/api/base";

//  ============= FETCH FRANCHISES DETAILS =============
export const getFranchisesDetails = async (alias: string) => 
    (await baseInstanceV1.get(API_URL.franchises_details(alias))).data;
