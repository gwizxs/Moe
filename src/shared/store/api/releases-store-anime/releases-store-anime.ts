import { makeAutoObservable } from "mobx";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";
import { getReleasesAnime, getReleasesAnimeLimit } from "shared/api/services/releases-anime-catalog/api";
import { AxiosResponse } from "axios";
import { Anime } from "shared/api/services/releases-anime-catalog/types";

export class ReleasesStoreAnime {
    constructor() {
        makeAutoObservable(this);
    }

    releasesData?: IPromiseBasedObservable<AxiosResponse<Anime[]>>

    getReleasesAnimeAction = async () => {
        try {
            console.log("getReleasesAnimeAction");
            this.releasesData =
                fromPromise<AxiosResponse<Anime[]>>(
                    getReleasesAnime()
                );
            console.log(this.releasesData, 'releasesData');
        } catch (error) {
            console.log(error);
        }
    }

    getReleasesAnimeLimitAction = async () => {
        try {
            console.log("getReleasesAnimeLimitAction");
            this.releasesData =
                fromPromise<AxiosResponse<Anime[]>>(
                    getReleasesAnimeLimit()
                );
            console.log(this.releasesData, 'releasesData limit');
        } catch (error) {
            console.log(error);
        }
    }
    
}

