import { makeAutoObservable} from "mobx";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";
import { AxiosResponse } from "axios";
import { ReleaseDetailsAnime } from "shared/api/services/releases-anime-details/types";
import { getReleasesDetailsAnime } from "shared/api/services/releases-anime-details/api";

export class ReleasesStoreAnimeInfo {
    releasesData?: IPromiseBasedObservable<AxiosResponse<ReleaseDetailsAnime>>;

    constructor() {
        makeAutoObservable(this);
    }

    getReleasesDetailsAnimeAction = async (id: number) => {
        try {
            console.log("getReleasesDetailsAnimeAction");
            this.releasesData =
                fromPromise<AxiosResponse<ReleaseDetailsAnime>>(
                    getReleasesDetailsAnime(id)
                );
            console.log(this.releasesData, 'releasesData');

        } catch (error) {
            console.error("Error fetching anime details:", error);
        }
    }
}