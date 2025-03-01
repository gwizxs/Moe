import classNames from "shared/library/classNames/classNames";
import { Article, ArticleView } from "../../model/types/article";
import { observer } from "mobx-react-lite"
import s from './ArticleList.module.scss'
import ArticleListItem from "../ArticleListItem/ArticleListItem";

interface ArticleListProps {
    className?: string;
    articles: Article[];
    view?: ArticleView;
}

export const ArticleList = observer((props: ArticleListProps) => {
    const {
        className,
        articles,
        view = ArticleView.SMALL
    } = props

    const renderArticle = (article: Article) => {
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
            {articles.length > 0
                ? articles.map(renderArticle)
                : null}
        </section>
    )
})

export default ArticleList