import { makeAutoObservable } from "mobx";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";
import { getReleasesAnime } from "shared/api/services/releases-anime-catalog/api";
import { GetReleasesAnimeResponse } from "shared/api/services/releases-anime-catalog/types";




export class ReleasesStoreAnime {
    constructor() {
        makeAutoObservable(this);
    }

    releasesData?: IPromiseBasedObservable<GetReleasesAnimeResponse[]>

    getReleasesAnimeAction = async () => {
        try {
            this.releasesData =
                fromPromise(
                    getReleasesAnime()
                );
        } catch (error) {
            console.log(error);
        }
    }
}