import { makeAutoObservable, runInAction, computed } from "mobx";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";
import { AxiosResponse } from "axios";
import { Episode, ReleaseDetailsAnime } from "shared/api/services/releases-anime-details/types";
import { getReleasesAnimePlayer } from "shared/api/services/releases-anime-player/api";

export class ReleasesStoreDetailsAnime {
    releasesData?: IPromiseBasedObservable<AxiosResponse<ReleaseDetailsAnime>>;
    currentAnime?: ReleaseDetailsAnime;
    error?: string;
    currentAnimeId?: number;
    
    constructor() {
        makeAutoObservable(this, {
            episodes: computed,
            getEpisodeBySort: false
        });
    }

    getReleasesDetailsAnimeAction = async (id: number) => {
        this.error = undefined;
        this.currentAnimeId = id;
        this.currentAnime = undefined;
        
        try {
            const promiseResult = getReleasesAnimePlayer(id);
            this.releasesData = fromPromise<AxiosResponse<ReleaseDetailsAnime>>(promiseResult);
            
            this.releasesData.case({
                fulfilled: (response) => {
                    if (response && response.data) {
                        runInAction(() => {
                            this.currentAnime = response.data;
                            this.currentAnimeId = response.data.id;
                        });
                    }
                },
                pending: () => {
                },
                rejected: (error: Error) => {
                    runInAction(() => {
                        console.error("Promise rejection in anime details:", error);
                        this.error = error.message;
                    });
                }
            });
        } catch (error) {
            console.error("Error fetching anime details:", error);
            runInAction(() => {
                if (error instanceof Error) {
                    this.error = error.message;
                }
            });
        }
    }

    setCurrentAnime = (anime: ReleaseDetailsAnime) => {
        runInAction(() => {
            this.currentAnime = anime;
            this.currentAnimeId = anime.id;
        });
    }

    get episodes(): Episode[] {
        if (this.currentAnime?.episodes) {
            return this.currentAnime.episodes;
        }
        
        if (!this.releasesData || this.releasesData.state !== "fulfilled") {
            return [];
        }
        
        const responseData = this.releasesData.value?.data;
        
        if (responseData) {
            if (Array.isArray(responseData.episodes)) {
                runInAction(() => {
                    this.currentAnime = responseData;
                    this.currentAnimeId = responseData.id;
                });
                return responseData.episodes;
            }
        }
        
        return [];
    }

    getEpisodeBySort(sortOrder: number): Episode | undefined {
        return this.episodes.find((ep: Episode) => ep.sort_order === sortOrder);
    }

    async getEpisodeWhenReady(sortOrder: number): Promise<Episode | undefined> {
        if (this.episodes.length > 0) {
            return this.getEpisodeBySort(sortOrder);
        }
        
        if (this.releasesData && this.releasesData.state === "pending") {
            try {
                await this.releasesData;
                return this.getEpisodeBySort(sortOrder);
            } catch (error) {
                console.error("Error waiting for episode data:", error);
                return undefined;
            }
        }

        return undefined;
    }
    
    dispose() {
        this.currentAnime = undefined;
        this.currentAnimeId = undefined;
        this.releasesData = undefined;
    }
}