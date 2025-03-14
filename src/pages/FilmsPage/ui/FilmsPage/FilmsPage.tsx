import { observer } from "mobx-react-lite";
import classNames from "shared/library/classNames/classNames";
import s from "./FilmsPage.module.scss";
import { ArticleViewSwitcher } from "features/ArticleViewSwitcher";
import { useCallback, useEffect } from "react";
import { Page } from "widgets/Page/Page";
import { useStore } from "app/providers/StoreProvider";
import { ArticleList, ArticleView } from "entities/Article";

interface FilmsPageProps {
    className?: string;
}

export const FilmsPage = observer(({ className }: FilmsPageProps) => {
    const { articlesViewStore, releasesStoreAnime } = useStore();

    const onChangeView = useCallback(
        (newView: ArticleView) => {
            articlesViewStore.setView(newView);
        },
        [articlesViewStore]
    );
    useEffect(() => {
        const fetchData = async () => {
            await releasesStoreAnime.getReleasesAnimeAction();
        };
        fetchData();
    }, [releasesStoreAnime]);
    

    if (releasesStoreAnime.releasesData?.state === "pending") {
        return <div>Загрузка...</div>;
    }

    if (releasesStoreAnime.releasesData?.state === "rejected") {
        return <div>Ошибка загрузки данных</div>;
    }

    return (
        <Page className={classNames(s.FilmsPage, {}, [className])}>
            <div className={s.wrapper}>
                <ArticleViewSwitcher view={articlesViewStore.view} onViewClick={onChangeView} />
            </div>
            <ArticleList
                view={articlesViewStore.view}
                articles={
                    releasesStoreAnime.releasesData?.value?.data || []
                }
            />
        </Page>
    );
});

export default FilmsPage;
