import { API_URL } from "shared/api/api_url";
import { baseInstanceV1 } from "shared/api/base";

//  ============= FETCH SEARCH ANIME =============

export const getSearchAnime = async (query: string) => {
    try {
        const response = await baseInstanceV1.get(API_URL.search_anime(query));
        console.log("API Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching search anime:", error);
        return null; 
    }
};