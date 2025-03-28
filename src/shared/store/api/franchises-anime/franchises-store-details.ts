import { makeAutoObservable } from "mobx";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";
import { AxiosResponse } from "axios";
import { FranchisesDetailsResponse } from "shared/api/services/franchises-anime/franchises-details/types";
import { getFranchisesDetails } from "shared/api/services/franchises-anime/franchises-details/api";


export class FranchisesStoreAnimeDetails {
    constructor() {
        makeAutoObservable(this);
    }

    franchisesDetailsData?: IPromiseBasedObservable<AxiosResponse<FranchisesDetailsResponse>>

    getFranchisesAnimeDetailsAction = async (alias: string) => {
        try {
            console.log("getFranchisesAnimeDetailsAction");
            this.franchisesDetailsData = fromPromise<AxiosResponse<FranchisesDetailsResponse>>(
                getFranchisesDetails(alias)
            );
            console.log(this.franchisesDetailsData, 'franchisesDetailsData');
        } catch (error) {
            console.log(error);
        }
    }
}

