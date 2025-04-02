import { observer } from "mobx-react-lite";
import classNames from "shared/library/classNames/classNames";
import s from "./FilmsPage.module.scss";
import { ArticleViewSwitcher } from "features/ArticleViewSwitcher";
import { useCallback, useEffect } from "react";
import { Page } from "widgets/Page/Page";
import { useStore } from "app/providers/StoreProvider";
import { ArticleList, ArticleView } from "entities/Article";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";
interface FilmsPageProps {
    className?: string;
}

const { Text } = Typography;

export const FilmsPage = observer(({ className }: FilmsPageProps) => {
    const { articlesViewStore, releasesStoreAnime } = useStore();
    const { t } = useTranslation();

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

    if (releasesStoreAnime.releasesData?.state === "rejected") {
        return <Text>{t("Ошибка загрузки данных")}</Text>;
    }

    return (
        <Page className={classNames(s.FilmsPage, {}, [className])}>
            <div className={s.wrapper}>
                <ArticleViewSwitcher view={articlesViewStore.view} onViewClick={onChangeView} />
            </div>
            <ArticleList
                isLoading={releasesStoreAnime.releasesData?.state === "pending"}
                view={articlesViewStore.view}
                articles={releasesStoreAnime.releasesData?.value?.data || []}
                genres={true}
            />
        </Page>
    );
});

export default FilmsPage;

