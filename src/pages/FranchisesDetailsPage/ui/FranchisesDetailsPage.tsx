import { useStore } from "app/providers/StoreProvider";
import { FranchisesDetails } from "entities/Franchise";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Page } from "widgets/Page/Page";
import { FranchisesDetailsResponse } from "shared/api/services/franchises-anime/franchises-details/types";

export const FranchisesDetailsPage = () => {
    const { franchisesStoreAnimeDetails } = useStore();
    const { alias } = useParams();

    useEffect(() => {
        const fetchData = () => {
            if(alias) {
                franchisesStoreAnimeDetails.getFranchisesAnimeDetailsAction(alias);
            }
        };
        fetchData();
    }, [franchisesStoreAnimeDetails, alias]);

    // Получаем данные напрямую из value
    const franchiseData = franchisesStoreAnimeDetails.franchisesDetailsData?.value;
    const isLoading = franchisesStoreAnimeDetails.franchisesDetailsData?.state === 'pending';

    console.log('Состояние:', franchisesStoreAnimeDetails.franchisesDetailsData?.state);
    console.log('Данные франшизы:', franchiseData);

    return (
        <Page>
            <FranchisesDetails
                franchise={franchiseData as FranchisesDetailsResponse}
                isLoading={isLoading}
            />
        </Page> 
    )
}

export default FranchisesDetailsPage;
