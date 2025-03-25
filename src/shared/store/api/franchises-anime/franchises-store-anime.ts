import { makeAutoObservable } from "mobx";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";
import { getRandomFranchisesAnime } from "shared/api/services/franchises-anime/random-franchises/api";
import { AxiosResponse } from "axios";
import { RandomFranchisesResponse } from "shared/api/services/franchises-anime/random-franchises/types";

export class FranchisesStoreAnime {
    constructor() {
        makeAutoObservable(this);
    }

    franchisesData?: IPromiseBasedObservable<AxiosResponse<RandomFranchisesResponse>>

    getFranchisesAnimeAction = async () => {
        try {
            console.log("getFranchisesAnimeAction");
            this.franchisesData =
                fromPromise<AxiosResponse<RandomFranchisesResponse>>(
                    getRandomFranchisesAnime()
                );
            console.log(this.franchisesData, 'franchisesData');
        } catch (error) {
            console.log(error);
        }
    }
}

