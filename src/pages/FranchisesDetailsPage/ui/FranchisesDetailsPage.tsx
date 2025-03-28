import { useStore } from "app/providers/StoreProvider";
import { FranchisesDetails } from "entities/Franchise";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Page } from "widgets/Page/Page";
import { FranchisesDetailsResponse } from "shared/api/services/franchises-anime/franchises-details/types";
import { observer } from "mobx-react-lite";

export const FranchisesDetailsPage = observer(() => {
    const { franchisesStoreAnimeDetails } = useStore();
    const { alias } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            if(alias) {
                try {
                    await franchisesStoreAnimeDetails.getFranchisesAnimeDetailsAction(alias);
                } catch (error) {
                    console.error("Ошибка загрузки данных франшизы:", error);
                }
            }
        };
        fetchData();
    }, [franchisesStoreAnimeDetails, alias]);

    const franchiseData = franchisesStoreAnimeDetails.franchisesDetailsData?.value as FranchisesDetailsResponse | undefined;
    const isPending = franchisesStoreAnimeDetails.franchisesDetailsData?.state === 'pending';

    return (
        <Page>
            <FranchisesDetails
                franchise={franchiseData}
                isLoading={isPending} 
            />
        </Page>
    );
});

export default FranchisesDetailsPage;
