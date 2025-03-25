import { observer } from "mobx-react-lite";
import classNames from "shared/library/classNames/classNames";
import s from './Franchises.module.scss'
import { Page } from "widgets/Page/Page";
import { FranchisesList } from "entities/Franchise";
import { useStore } from "app/providers/StoreProvider";
import { useEffect } from "react";
import { RandomFranchisesResponse } from "shared/api/services/franchises-anime/random-franchises/types";

interface FranchisesPageProps {
    className?: string;
}

export const FranchisesPage = observer(({ className }: FranchisesPageProps) => {

    const { franchisesStoreAnime } = useStore()

    useEffect(() => {
        const fetchData = async () => {
            await franchisesStoreAnime.getFranchisesAnimeAction();
        };
        fetchData();
    }, [franchisesStoreAnime]);

    return (
        <Page className={classNames(s.FranchisesPage, {}, [className])}>
            <FranchisesList 
                franchises={franchisesStoreAnime.franchisesData?.value as RandomFranchisesResponse}
                isLoading={franchisesStoreAnime.franchisesData?.state === "pending"}
            />
        </Page>
    );
});

export default FranchisesPage;

