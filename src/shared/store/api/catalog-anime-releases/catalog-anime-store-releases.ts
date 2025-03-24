import { makeAutoObservable } from "mobx";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";
import { AxiosResponse } from "axios";
import { AnimeResponse } from "shared/api/services/catalog-anime-releases/types";
import { getCatalogAnimeReleases } from "shared/api/services/catalog-anime-releases/api";


export class CatalogAnimeStoreReleases {
    constructor() {
        makeAutoObservable(this);
    }

    releasesData?: IPromiseBasedObservable<AxiosResponse<AnimeResponse[]>>

    getCatalogAnimeReleasesAction = async () => {
        try {
            console.log("getCatalogAnimeReleasesAction");
            this.releasesData =
                fromPromise<AxiosResponse<AnimeResponse[]>>(
                    getCatalogAnimeReleases()
                );
            console.log(this.releasesData, 'releasesData');
        } catch (error) {
            console.log(error);
        }
    }
}

