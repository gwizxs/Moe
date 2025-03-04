import { observer } from "mobx-react-lite";
import { Page } from "widgets/Page/Page";
import classNames from "shared/library/classNames/classNames";
import s from './VacancyPage.module.scss'
import { Filter } from "widgets/Filter";


interface ProjectsPageProps {
    className?: string;
}

// ПЕРЕДЕЛАТЬ ЛОГИКУ ПРИ ПОЯВЛЕНИИ БЕКЕНДА !!!!!!!!

export const SeriesPage = observer((props: ProjectsPageProps) => {
    const { className } = props;
    // const [searchParams] = useSearchParams();

    // const currentType = searchParams.get("type") || SwitcherType.VACANCIES;


    // // Генерация статей (каждая вторая — "мой проект")
    // const articles = new Array(20).fill(0).map((_, index) => ({
    //     id: String(index),
    //     title: `Project ${index + 1}`,
    //     subtitle: "com/wp-content/uploads/2020/11/js.pngcom/wp-content/uploads/2020/11/js.pngcom/wp-content/uploads/2020/11/js.pngcom/wp-content/uploads/2020/11/js.pngcom/wp-content/uploads/2020/11/js.pngcom/wp-content/uploads/2020/11/js.pngcom/wp-content/uploads/2020/11/js.pngcom/wp-content/uploads/2020/11/js.pngcom/wp-content/uploads/2020/11/js.pngcom/wp-content/uploads/2020/11/js.pngcom/wp-content/uploads/2020/11/js.pngcom/wp-content/uploads/2020/11/js.png",
    //     stack: "ergoketpoger gpoerkgoperkgreg reg er r eg reg re ger g re gre g erg",
    //     createdAt: "26.02.2025",
    //     myVacancy: index % 5 === 0, 
    // }));

    // const filteredArticles =
    //     currentType === SwitcherType.MY_PROJECTS
    //         ? articles.filter(article => article.myVacancy)
    //         : articles;

    return (
        <Page className={classNames(s.ProjectsPage, {}, [className])}>
            <div className={s.wrapper}>
                <Filter />
            </div>
        </Page>
    );
});

export default SeriesPage;
