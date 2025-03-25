import { API_URL } from "shared/api/api_url";
import { baseInstanceV1 } from "shared/api/base";
import { AxiosResponse } from "axios";
import { ReleaseDetailsAnime } from "../releases-anime-details/types";


//  ============= FETCH ANIME PLAYER =============

export const getReleasesAnimePlayer = async (id: number): Promise<AxiosResponse<ReleaseDetailsAnime>> => {
    try {
        const response = await baseInstanceV1.get(API_URL.releases_anime_details(id));
        
        if (response.data && !response.data.episodes && response.data.data && Array.isArray(response.data.data.episodes)) {
            response.data = response.data.data;
        }
        return response;
    } catch (error) {
        console.error("Error fetching anime details:", error);
        throw error;
    }
};