export const API_URL = {
    releases_anime: () => 'anime/catalog/releases',
    releases_anime_details: (id: number) => `anime/releases/${id}`,
    franchises_random: () => `anime/franchises/random?limit=4`,
    franchises_all: () => `anime/franchises`,
    franchises_details: (alias: string) => `anime/franchises/${alias}`,


    // ================================ FOR SEARCH ================================
    search_anime: (query: string) => `app/search/releases?query=${query}`,

    // ================================ FOR LANDING PAGE ================================
    releases_catalog_with_carousel: () => `anime/catalog/releases?page=${Math.floor(Math.random() * 1) + 1}&limit=8`,
    releases_anime_limit: () => `anime/catalog/releases?limit=4`,
}