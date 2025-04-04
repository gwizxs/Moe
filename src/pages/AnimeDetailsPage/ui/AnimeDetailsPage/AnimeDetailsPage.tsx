import { observer } from "mobx-react-lite";
import classNames from "shared/library/classNames/classNames";
import s from "./AnimeDetailsPage.module.scss";
import { Page } from "widgets/Page/Page";
import { useStore } from "app/providers/StoreProvider";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ArticleDetails } from "entities/Article";
import { ReleaseDetailsAnime } from "shared/api/services/releases-anime-details/types";


interface AnimeDetailsPageProps {
    className?: string;
}

export const AnimeDetailsPage = observer(({ className }: AnimeDetailsPageProps) => {
    const { releasesStoreAnimeInfo } = useStore();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");

    useEffect(() => {
        releasesStoreAnimeInfo.getReleasesDetailsAnimeAction(Number(id));
        console.log(releasesStoreAnimeInfo.releasesData);
    }, [id, releasesStoreAnimeInfo]);

    return (
        <Page className={classNames(s.FilmsPage, {}, [className])}>
            <ArticleDetails anime={releasesStoreAnimeInfo.releasesData?.value as ReleaseDetailsAnime} />
        </Page>
    );
});

export default AnimeDetailsPage;

