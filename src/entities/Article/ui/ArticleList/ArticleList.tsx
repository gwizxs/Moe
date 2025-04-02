import classNames from "shared/library/classNames/classNames";
import { observer } from "mobx-react-lite"
import s from './ArticleList.module.scss'
import ArticleListItem from "../ArticleListItem/ArticleListItem";
import { Anime } from "shared/api/services/releases-anime-catalog/types";
import { ArticleView } from "entities/Article";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";

interface ArticleListProps {
    className?: string;
    articles: Anime[];
    view?: ArticleView;
    isLoading: boolean
    genres: boolean
    onItemClick?: () => void;
}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 14 : 5)
    .fill(0)
    .map((index) => (
        <ArticleListItemSkeleton className={s.card} key={index} view={view} />
    ));

export const ArticleList = observer((props: ArticleListProps) => {
    const {
        className,
        articles,
        view = ArticleView.SMALL,
        isLoading,
        genres,
        onItemClick
    } = props

    const renderArticle = (article: Anime) => {
        return (
            <ArticleListItem
                article={article}
                view={view}
                key={article.id}
                genres={genres}
                onClick={onItemClick}
            />
        )
    }
    return (
        <section className={classNames(s.ArticleList, {}, [className, s[view]])}>
            {Array.isArray(articles) ? articles.map(renderArticle) : null}
            {isLoading && getSkeletons(view)}
        </section>
    )
})

export default ArticleList
