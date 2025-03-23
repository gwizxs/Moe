import { API_URL } from "shared/api/api_url";
import { baseInstanceV1 } from "shared/api/base";
import { AxiosResponse } from "axios";
import { ReleaseDetailsAnime } from "../releases-anime-details/types";

//  ============= FETCH ANIME RELEASES =============

export const getReleasesDetailsAnime = async (id: number): Promise<AxiosResponse<ReleaseDetailsAnime>> => {
    try {
        console.log("API CALLING URL:", API_URL.releases_anime_details(id));
        const response = await baseInstanceV1.get(API_URL.releases_anime_details(id));
        
        console.log("API GET Response structure:", {
            status: response.status,
            hasData: !!response.data,
            dataType: typeof response.data,
            isDataObject: typeof response.data === 'object',
            hasEpisodes: response.data && Array.isArray(response.data.episodes)
        });
        
        // If for some reason response is not in expected format, transform it
        // This ensures the structure is always AxiosResponse<ReleaseDetailsAnime>
        if (response.data && !response.data.episodes && response.data.data && Array.isArray(response.data.data.episodes)) {
            console.log("FIXING NESTED RESPONSE FORMAT");
            response.data = response.data.data;
        }
        
        return response;
    } catch (error) {
        console.error("Error fetching anime details:", error);
        throw error;
    }
};