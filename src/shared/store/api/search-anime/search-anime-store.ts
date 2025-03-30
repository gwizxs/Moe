import { makeAutoObservable } from "mobx";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";
import { AxiosResponse } from "axios";
import { getSearchAnime } from "shared/api/services/search-anime/api";
import { SearchAnimeResponse } from "shared/api/services/search-anime/types";

export class ReleasesStoreAnime {
    constructor() {
        makeAutoObservable(this);
    }

    searchData?: IPromiseBasedObservable<AxiosResponse<SearchAnimeResponse[]>>

    getSearchAnimeAction = async (query: string) => {
        try {
            console.log("getSearchAnimeAction");
            this.searchData =
                fromPromise<AxiosResponse<SearchAnimeResponse[]>>(
                    getSearchAnime(query)
                );
            console.log(this.searchData, 'searchData');
        } catch (error) {
            console.log(error);
        }
    }
}

