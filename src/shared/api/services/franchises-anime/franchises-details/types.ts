export interface FranchisesDetailsResponse {
    id: string;
    name: string;
    image: {
        preview: string;
        thumbnail: string;
        optimized: {
            preview: string;
            thumbnail: string;
        }
    };
    rating: number | null;
    last_year: number;
    first_year: number;
    name_english: string;
    total_episodes: number;
    total_releases: number;
    total_duration: string;
    total_duration_in_seconds: number;
    franchise_releases: FranchiseRelease[];
}

interface FranchiseRelease {
    id: string;
    sort_order: number;
    release_id: number;
    franchise_id: string;
    release: {
        id: number;
        type: {
            value: string;
            description: string;
        };
        year: number;
        name: {
            main: string;
            english: string;
            alternative: string;
        };
        alias: string;
        season: {
            value: string;
            description: string;
        };
        poster: {
            src: string;
            thumbnail: string;
            optimized: {
                src: string;
                thumbnail: string;
            }
        };
        fresh_at: string;
        created_at: string;
        updated_at: string;
        is_ongoing: boolean;
        age_rating: {
            value: string;
            label: string;
            is_adult: boolean;
            description: string;
        };
        publish_day: {
            value: number;
            description: string;
        };
        description: string;
        notification: null;
        episodes_total: number;
        external_player: string;
        is_in_production: boolean;
        is_blocked_by_geo: boolean;
        episodes_are_unknown: boolean;
        is_blocked_by_copyrights: boolean;
        added_in_users_favorites: number;
        average_duration_of_episode: number;
    };
}