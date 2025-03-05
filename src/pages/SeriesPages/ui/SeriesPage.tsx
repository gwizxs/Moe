import { observer } from "mobx-react-lite";
import { Page } from "widgets/Page/Page";
import classNames from "shared/library/classNames/classNames";
import s from './SeriesPage.module.scss'
import { Filter } from "widgets/Filter";


interface ProjectsPageProps {
    className?: string;
}


export const SeriesPage = observer((props: ProjectsPageProps) => {
    const { className } = props;


    return (
        <Page className={classNames(s.ProjectsPage, {}, [className])}>
            <div className={s.wrapper}>
                <Filter />
            </div>
        </Page>
    );
});

export default SeriesPage;
