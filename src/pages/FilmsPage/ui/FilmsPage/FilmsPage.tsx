import { observer } from "mobx-react-lite";
import classNames from "shared/library/classNames/classNames";
import s from "./FilmsPage.module.scss";
import { ArticleList } from "entities/Article";
import { ArticleView } from "entities/Article/model/types/article";
import { ArticleViewSwitcher } from "features/ArticleViewSwitcher";
import { useCallback, useEffect } from "react";
import { Page } from "widgets/Page/Page";
import { useStore } from "app/providers/StoreProvider";

interface ProjectsPageProps {
    className?: string;
}


export const FilmsPage = observer((props: ProjectsPageProps) => {
    const { className } = props;
    const { articlesViewStore, releasesStoreAnime } = useStore();

    useEffect(() => {
            console.log(releasesStoreAnime.releasesData);
    }, [releasesStoreAnime.releasesData?.state]);

    const onChangeView = useCallback(
        (newView: ArticleView) => {
            articlesViewStore.setView(newView);
        },
        [articlesViewStore]
    );

    // Генерация статей (каждая вторая — "мой проект")
    const articles = new Array(10).fill(0).map((_, index) => ({
        id: 9821 + index,
        type: "TV",
        year: 2024,
        name: {
            main: `О движении Земли ${index}`,
        },
        alias: `chi-chikyuu-no-undou-ni-tsuite-${index}`,
        season: {
            value: "осень",
            description: "autumn",
        },
        poster: {
            src: `https://anilibria.top/api/v1/storage/releases/posters/9821/A5pVpdtZP5v7buxh8zc2KCyzCe8tua0a.webp`,
            thumbnail: `https://anilibria.top/api/v1/storage/releases/posters/9821/A5pVpdtZP5v7buxh8zc2KCyzCe8tua0a.webp`,
            optimized: {
                src: `https://anilibria.top/storage/releases/posters/9821/7FpmtsdtDAVNEvyQTzVRRLsU1T7ZemAo.jpg`,
                thumbnail: `https://anilibria.top/api/v1/storage/releases/posters/9821/A5pVpdtZP5v7buxh8zc2KCyzCe8tua0a.webp`,
            },
        },
        isOngoing: index % 2 === 0,
        ageRating: {
            label: "16+",
        },
        publishDay: "Среда",
        episodesTotal: 24,
        averageDuration: 25,
        genres: ["Сейнен", "Драма", "Исторический"],
    }));


    return (
        <Page className={classNames(s.ProjectsPage, {}, [className])}>
            <div className={s.wrapper}>
                <ArticleViewSwitcher view={articlesViewStore.view} onViewClick={onChangeView} />
            </div>
            <ArticleList view={articlesViewStore.view} articles={articles} />
        </Page>
    );
});

export default FilmsPage;
