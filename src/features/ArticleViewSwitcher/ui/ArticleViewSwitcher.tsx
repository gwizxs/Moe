import { observer } from "mobx-react-lite"
import classNames from "shared/library/classNames/classNames"
import s from './ArticleViewSwitcher.module.scss'
import { ArticleView } from "entities/Article"
import { Grid2x2, List } from "lucide-react"
import { Button } from "antd"
import { useStore } from "app/providers/StoreProvider"
interface ArticleViewSwitcherProps {
    className?: string;
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void
}

const viewTypes = [
    {
        view: ArticleView.SMALL,
        icon: Grid2x2,
    },
    {
        view: ArticleView.BIG,
        icon: List,
    },
];

export const ArticleViewSwitcher = observer(({ className }: ArticleViewSwitcherProps) => {
    const { articlesViewStore } = useStore();

    return (
        <section className={classNames(s.ArticleViewSwitcher, {}, [className])}>
            {viewTypes.map((item, index) => {
                const Icon = item.icon;
                const isActive = articlesViewStore.view === item.view;
                return (
                    <Button
                    className={s.button}
                        type={isActive ? "primary" : "default"}
                        variant="outlined"
                        key={index}
                        onClick={() =>  articlesViewStore.setView(item.view)}
                    >
                        <Icon />
                    </Button>
                );
            })}
        </section>
    );
});