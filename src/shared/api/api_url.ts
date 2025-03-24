export const API_URL = {
    releases_anime: () => 'anime/catalog/releases',
    releases_anime_details: (id: number) => `anime/releases/${id}`,
    releases_catalog_with_carousel: () => `anime/catalog/releases?page=${Math.floor(Math.random() * 15) + 1}&limit=8`,
}