import { observer } from "mobx-react-lite";
import classNames from "shared/library/classNames/classNames";
import s from "./AnimeDetailsPage.module.scss";
import { Page } from "widgets/Page/Page";
import { useStore } from "app/providers/StoreProvider";
import { useEffect } from "react";
import { ArticleDetails } from "entities/Article";

interface AnimeDetailsPageProps {
    className?: string;
}

export const AnimeDetailsPage = observer(({ className }: AnimeDetailsPageProps) => {
    const { releasesStoreAnimeDetails } = useStore();

    useEffect(() => {
        releasesStoreAnimeDetails.getReleasesDetailsAnimeAction(9853);
        console.log(releasesStoreAnimeDetails.releasesData);
    }, [releasesStoreAnimeDetails]);

    

    return (
        <Page className={classNames(s.FilmsPage, {}, [className])}>
            d
        </Page>
    );
});

export default AnimeDetailsPage;
