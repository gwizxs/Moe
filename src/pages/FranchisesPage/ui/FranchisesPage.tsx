import { observer } from "mobx-react-lite";
import classNames from "shared/library/classNames/classNames";
import s from "./FranchisesPage.module.scss";
import { Page } from "widgets/Page/Page";

interface FranchisesPageProps {
    className?: string;
}

    export const FranchisesPage = observer(({ className }: FranchisesPageProps) => {

    return (
        <Page className={classNames(s.FranchisesPage, {}, [className])}>
            <div>fjfj</div>
        </Page>
    );
});

export default FranchisesPage;

