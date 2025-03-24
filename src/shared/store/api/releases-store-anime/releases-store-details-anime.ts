import { makeAutoObservable, runInAction, computed } from "mobx";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";
import { AxiosResponse } from "axios";
import { Episode, ReleaseDetailsAnime } from "shared/api/services/releases-anime-details/types";
import { getReleasesAnimePlayer } from "shared/api/services/releases-anime-player/api";

export class ReleasesStoreDetailsAnime {
    releasesData?: IPromiseBasedObservable<AxiosResponse<ReleaseDetailsAnime>>;
    currentAnime?: ReleaseDetailsAnime;
    error?: string;
    episodesCache: Map<number, Episode> = new Map();
    
    constructor() {
        makeAutoObservable(this, {
            episodes: computed,
            getEpisodeBySort: false
        });
    }

    getReleasesDetailsAnimeAction = async (id: number) => {
        this.episodesCache.clear();
        this.error = undefined;
        
        try {
            const promiseResult = getReleasesAnimePlayer(id);
            this.releasesData = fromPromise<AxiosResponse<ReleaseDetailsAnime>>(promiseResult);
            
            this.releasesData.case({
                fulfilled: (response) => {
                    if (response && response.data) {
                        runInAction(() => {
                            this.currentAnime = response.data;
                            if (response.data.episodes) {
                                response.data.episodes.forEach(episode => {
                                    this.episodesCache.set(episode.sort_order, episode);
                                });
                            }
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
            
            this.episodesCache.clear();
            if (anime.episodes) {
                anime.episodes.forEach(episode => {
                    this.episodesCache.set(episode.sort_order, episode);
                });
            }
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
                });
                return responseData.episodes;
            }
        }
        
        return [];
    }

    getEpisodeBySort(sortOrder: number): Episode | undefined {
        if (this.episodesCache.has(sortOrder)) {
            return this.episodesCache.get(sortOrder);
        }
        
        const foundEpisode = this.episodes.find((ep: Episode) => ep.sort_order === sortOrder);
        
        if (foundEpisode) {
            this.episodesCache.set(sortOrder, foundEpisode);
        }
        
        return foundEpisode;
    }

    async getEpisodeWhenReady(sortOrder: number): Promise<Episode | undefined> {
        if (this.episodesCache.has(sortOrder)) {
            return this.episodesCache.get(sortOrder);
        }
        
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
        this.episodesCache.clear();
    }
}