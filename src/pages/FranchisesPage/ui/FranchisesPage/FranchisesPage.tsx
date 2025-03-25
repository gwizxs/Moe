import { observer } from "mobx-react-lite";
import classNames from "shared/library/classNames/classNames";
import s from './Franchises.module.scss'
import { Page } from "widgets/Page/Page";
import { FranchisesList } from "entities/Franchise";
import { useStore } from "app/providers/StoreProvider";
import { useEffect } from "react";
import { FranchisesResponse } from "shared/api/services/franchises-anime/types";
import { FranchisesPageHeader } from "../FranchisesPageHeader/FranchisesPageHeader";

interface FranchisesPageProps {
    className?: string;
}

export const FranchisesPage = observer(({ className }: FranchisesPageProps) => {

    const { franchisesStoreAnime } = useStore()

    useEffect(() => {
        const fetchData = async () => {
            await franchisesStoreAnime.getAllFranchisesAnimeAction();
        };
        fetchData();
    }, [franchisesStoreAnime]);

    return (
        <Page className={classNames(s.FranchisesPage, {}, [className])}>
            <FranchisesPageHeader />
            <FranchisesList 
                franchises={franchisesStoreAnime.franchisesDataAll?.value as FranchisesResponse}
                isLoading={franchisesStoreAnime.franchisesDataAll?.state === "pending"}
            />
        </Page>
    );
});

export default FranchisesPage;

