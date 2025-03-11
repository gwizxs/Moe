import classNames from "shared/library/classNames/classNames";
import { observer } from "mobx-react-lite"
import s from './ArticleList.module.scss'
import ArticleListItem from "../ArticleListItem/ArticleListItem";
import { Anime } from "shared/api/services/releases-anime-catalog/types";
import { ArticleView } from "entities/Article";

interface ArticleListProps {
    className?: string;
    articles: Anime[];
    view?: ArticleView;
}

export const ArticleList = observer((props: ArticleListProps) => {
    const {
        className,
        articles,
        view = ArticleView.SMALL
    } = props

    const renderArticle = (article: Anime) => {
        return (
            <ArticleListItem
                article={article}
                view={view}
                key={article.id}
            />
        )
    }
    return (
        <section className={classNames(s.ArticleList, {}, [className, s[view]])}>
            {Array.isArray(articles) ? articles.map(renderArticle) : null}
        </section>
    )
})

export default ArticleList
