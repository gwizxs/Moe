import { observer } from "mobx-react-lite";
import classNames from "shared/library/classNames/classNames";
import s from "./ProjectsPage.module.scss";
import { ArticleList } from "entities/Article";
import { ArticleStatus, ArticleView } from "entities/Article/model/types/article";
import { ArticleViewSwitcher } from "features/ArticleViewSwitcher";
import { useCallback } from "react";
import { Page } from "widgets/Page/Page";
import { SwitcherType } from "shared/constants/ToggleSwitchers";
import { useSearchParams } from "react-router-dom";
import { useStore } from "app/providers/StoreProvider";

interface ProjectsPageProps {
    className?: string;
}

// ПЕРЕДЕЛАТЬ ЛОГИКУ ПРИ ПОЯВЛЕНИИ БЕКЕНДА !!!!!!!!

export const ProjectsPage = observer((props: ProjectsPageProps) => {
    const { className } = props;
    const { articlesViewStore } = useStore();
    const [searchParams] = useSearchParams();

    const currentType = searchParams.get("type") || SwitcherType.PROJECTS;

    const onChangeView = useCallback(
        (newView: ArticleView) => {
            articlesViewStore.setView(newView);
        },
        [articlesViewStore]
    );

    // Генерация статей (каждая вторая — "мой проект")
    const articles = new Array(20).fill(0).map((_, index) => ({
        id: String(index),
        title: `Project ${index + 1}`,
        subtitle: "Что нового в JS за 2022 год?",
        description: "com/wp-content/uploads/2020/11/js.pngcom/wp-content/uploads/2020/11/js.pngcom/wp-content/uploads/2020/11/js.pngcom/wp-content/uploads/2020/11/js.pngcom/wp-content/uploads/2020/11/js.pngcom/wp-content/uploads/2020/11/js.pngcom/wp-content/uploads/2020/11/js.pngcom/wp-content/uploads/2020/11/js.pngcom/wp-content/uploads/2020/11/js.pngcom/wp-content/uploads/2020/11/js.pngcom/wp-content/uploads/2020/11/js.pngcom/wp-content/uploads/2020/11/js.png",
        status: ArticleStatus.VACANCIES,
        icon: "https://xakep.ru/wp-content/uploads/2018/05/171485/KuroiSH-hacker.jpg",
        createdAt: "26.02.2025",
        myProject: index % 5 === 0, 
    }));

    const filteredArticles =
        currentType === SwitcherType.MY_PROJECTS
            ? articles.filter(article => article.myProject)
            : articles;

    return (
        <Page className={classNames(s.ProjectsPage, {}, [className])}>
            <div className={s.wrapper}>
                <ArticleViewSwitcher view={articlesViewStore.view} onViewClick={onChangeView} />
            </div>
            <ArticleList view={articlesViewStore.view} articles={filteredArticles} />
        </Page>
    );
});

export default ProjectsPage;
