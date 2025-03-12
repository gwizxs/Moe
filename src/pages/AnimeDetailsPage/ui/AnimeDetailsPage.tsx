import { observer } from "mobx-react-lite";
import classNames from "shared/library/classNames/classNames";
import s from "./AnimeDetailsPage.module.scss";
import { Page } from "widgets/Page/Page";
import { useStore } from "app/providers/StoreProvider";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ArticleDetails } from "entities/Article";


interface AnimeDetailsPageProps {
    className?: string;
}

export const AnimeDetailsPage = observer(({ className }: AnimeDetailsPageProps) => {
    const { releasesStoreAnimeDetails } = useStore();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");

    useEffect(() => {
        releasesStoreAnimeDetails.getReleasesDetailsAnimeAction(Number(id));
        console.log(releasesStoreAnimeDetails.releasesData);
    }, [id, releasesStoreAnimeDetails]);

    return (
        <Page className={classNames(s.FilmsPage, {}, [className])}>
                    <ArticleDetails anime={releasesStoreAnimeDetails.releasesData?.value} />
        </Page>
    );
});

export default AnimeDetailsPage;

