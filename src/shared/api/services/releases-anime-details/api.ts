import { API_URL } from "shared/api/api_url";
import { baseInstanceV1 } from "shared/api/base";

//  ============= FETCH ANIME RELEASES =============

export const getReleasesDetailsAnime = async (id: number) => {
    try {
        const response = await baseInstanceV1.get(API_URL.releases_anime_details(id));
        console.log("API Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching anime details:", error);
        return null; 
    }
};