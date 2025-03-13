import { makeAutoObservable, runInAction } from "mobx";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";
import { AxiosResponse } from "axios";
import { ReleaseDetailsAnime, Episode } from "shared/api/services/releases-anime-details/types";
import { getReleasesDetailsAnime } from "shared/api/services/releases-anime-details/api";

export class ReleasesStoreDetailsAnime {
    releasesData?: IPromiseBasedObservable<AxiosResponse<ReleaseDetailsAnime>>;
    episodes: Episode[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    getReleasesDetailsAnimeAction = async (id: number) => {
        try {
            console.log("Fetching anime details...");
            const response = await getReleasesDetailsAnime(id);
            
            if (!response || !response.episodes) {
                throw new Error("API response is invalid or episodes are missing");
            }

            const episodes = response.episodes.map((episode: Episode) => ({
                ...episode,
                name: episode.name || "Unnamed episode"
            }));

            runInAction(() => {
                this.releasesData = fromPromise(Promise.resolve({ data: response }));
                this.episodes = episodes;
            });

            console.log("Fetched episodes:", episodes);

        } catch (error) {
            console.error("Error fetching anime details:", error);
        }
    }

    getEpisodeByHash = (hash: string | null) => {
        if (!hash) return null;
        return this.episodes.find((episode: Episode) => episode.id === hash) || null;
    };
}
