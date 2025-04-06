import { observer } from "mobx-react-lite";
import { Page } from "widgets/Page/Page";
import classNames from "shared/library/classNames/classNames";
import s from './SeriesPage.module.scss'
import { SidebarWithPlayer } from "widgets/SidebarWithPlayer";
import { Home } from "lucide-react";


interface ProjectsPageProps {
    className?: string;
}


export const SeriesPage = observer((props: ProjectsPageProps) => {
    const { className } = props;


    return (
        <Page className={classNames(s.ProjectsPage, {}, [className])}>
            <div className={s.wrapper}>
                <SidebarWithPlayer items={[
                    {
                        key: '1',
                        label: 'Home',
                        icon: <Home />,
                    },
                    {
                        key: '2',
                        label: 'Home',
                        icon: <Home />,
                    },
                    {
                        key: '3',
                        label: 'Home',
                        icon: <Home />,
                    },
                    {
                        key: '4',
                        label: 'Home',
                        icon: <Home />,
                    },
                ]} />
            </div>
        </Page>
    );
});

export default SeriesPage;
