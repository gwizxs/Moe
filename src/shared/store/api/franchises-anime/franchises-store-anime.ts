import { makeAutoObservable } from "mobx";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";
import { getRandomFranchisesAnime } from "shared/api/services/franchises-anime/random-franchises/api";
import { AxiosResponse } from "axios";
import { getAllFranchisesAnime } from "shared/api/services/franchises-anime/franchises/api";
import { FranchisesResponse } from "shared/api/services/franchises-anime/types";

export class FranchisesStoreAnime {
    constructor() {
        makeAutoObservable(this);
    }

    franchisesData?: IPromiseBasedObservable<AxiosResponse<FranchisesResponse>>
    franchisesDataAll?: IPromiseBasedObservable<AxiosResponse<FranchisesResponse>>

    getFranchisesAnimeAction = async () => {
        try {
            console.log("getFranchisesAnimeAction");
            this.franchisesData =
                fromPromise<AxiosResponse<FranchisesResponse>>(
                    getRandomFranchisesAnime()
                );
            console.log(this.franchisesData, 'franchisesData');
        } catch (error) {
            console.log(error);
        }
    }

    getAllFranchisesAnimeAction = async () => {
        try {
            console.log("getAllFranchisesAnimeAction");
            this.franchisesDataAll =
                fromPromise<AxiosResponse<FranchisesResponse>>(
                    getAllFranchisesAnime()
                );
            console.log(this.franchisesDataAll, 'franchisesDataAll');
        } catch (error) {
            console.log(error);
        }
    }
}

