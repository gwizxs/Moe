import { makeAutoObservable, runInAction } from "mobx";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";
import { AxiosResponse } from "axios";
import { Episode, ReleaseDetailsAnime } from "shared/api/services/releases-anime-details/types";
import { getReleasesAnimePlayer } from "shared/api/services/releases-anime-player/api";

export class ReleasesStoreDetailsAnime {
    releasesData?: IPromiseBasedObservable<AxiosResponse<ReleaseDetailsAnime>>;
    currentAnime?: ReleaseDetailsAnime;
    error?: string;
    
    constructor() {
        makeAutoObservable(this);
    }

    getReleasesDetailsAnimeAction = async (id: number) => {
        try {
            this.releasesData =
                fromPromise<AxiosResponse<ReleaseDetailsAnime>>(
                    getReleasesAnimePlayer(id)
                );
            
            this.releasesData.then(response => {
                
                if (response && response.data) {
                    runInAction(() => {
                        this.currentAnime = response.data;
                    });
                }
            });
            
            this.releasesData.case({
                fulfilled: () => {},
                pending: () => {},
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
        this.currentAnime = anime;
    }

    get episodes(): Episode[] {
        if (this.currentAnime && this.currentAnime.episodes) {
            return this.currentAnime.episodes;
        }
        
        if (!this.releasesData || this.releasesData.state !== "fulfilled") {
            return [];
        }
        
        let episodes: Episode[] = [];
        
        const responseData = this.releasesData.value?.data;
        
        if (responseData) {
            if (Array.isArray(responseData.episodes)) {
                episodes = responseData.episodes;
                runInAction(() => {
                    this.currentAnime = responseData;
                });
            } 
            else if (responseData.id && typeof responseData.id === 'number') {
                runInAction(() => {
                    this.currentAnime = responseData;
                });
                
                if (Array.isArray(responseData.episodes)) {
                    episodes = responseData.episodes;
                }
            }
        }
        
        return episodes;
    }

    getEpisodeBySort(sortOrder: number): Episode | undefined {
        if (this.episodes.length === 0) {
            return undefined;
        }
        
        const foundEpisode = this.episodes.find((ep: Episode) => ep.sort_order === sortOrder);
        return foundEpisode;
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
}
