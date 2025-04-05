import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next"
import classNames from "shared/library/classNames/classNames"
import s from './ArticleListItem.module.scss'
import { Button, Card, Col, Row, Tag, Typography, Image } from "antd"
import { Anime } from "shared/api/services/releases-anime-catalog/types"
import { ArticleView } from "entities/Article"
import { Link } from "react-router-dom"
import { AppRoutes } from "shared/config/routeConfig/routeConfig"
interface ArticleListItemProps {
    className?: string;
    article: Anime;
    view: ArticleView;
    genres: boolean;
    onClick?: () => void;
}

const { Paragraph, Title } = Typography;

export const ArticleListItem = observer((props: ArticleListItemProps) => {
    const {
        className,
        article,
        view,
        genres,
        onClick
    } = props

    const { t } = useTranslation()

    const ArticleTags = () => {
        return (
            <div className={s.tags}>
                {genres && article.genres.map((genre) => (
                    <Tag key={genre.id} className={s.tag}>
                        {genre.name}
                    </Tag>
                ))}
            </div>
        )
    }

    if (view === ArticleView.BIG) {
        return (
            <Card className={classNames(s.ArticleListItem, {}, [className, s.BIG])}>
                <Link to={`/${AppRoutes.ANIME_DETAILS}/${article.alias}?id=${article.id}`} onClick={onClick}>
                    <Row gutter={16} wrap={false}>
                        <Col flex="250px" className={s.col}>
                            <Image
                                className={s.CardContent}
                                src={`${import.meta.env.VITE_IMG_URL}${article.poster.optimized.src}`}
                            />
                        </Col>
                        <Col flex="auto" className={s.col}>
                            <div className={s.animeInfo}>
                                <Title level={4} className={s.title}>{article.name.main}</Title>
                                <Title level={5} type="secondary" className={s.subtitle}>
                                    {article.name.english} ({article.year})
                                </Title>
                                <div className={s.tagsContainer}>
                                    <Tag color="red" className={s.ageRating}>{article.age_rating.label}</Tag>
                                    {genres && article.genres.map((tag) => (
                                        <Tag key={tag.id} className={s.tag}>{tag.name}</Tag>
                                    ))}
                                    <Tag color="gold">{article.year}</Tag>
                                    <Tag color="purple">{article.season.description}</Tag>
                                    <Tag color="green">{article.type.description}</Tag>
                                </div>
                                <Paragraph className={s.description} ellipsis={{ rows: 8, expandable: false }}>
                                    {article.description}
                                </Paragraph>
                            </div>
                        </Col>
                    </Row>
                </Link>
            </Card>


        )
    }

    return (
        <Row
            className={classNames(s.ArticleListItem, {}, [className, s[view]])}
            wrap={true}
        >
            <Col key={article.id}
                className={s.col}
            >
                <Card className={s.CardContent}>
                    <section className={s.date}>
                        <div className={s.CardHoverText}>
                            <div className={s.episode}>{article.episodes_total} {t("эпизод")}</div>
                            <Title className={s.title} style={{ color: 'var(--inverted-bg-color)' }} level={4}>
                                {article.name.main}
                            </Title>
                            <Paragraph style={{ color: 'var(--inverted-bg-color)' }}>
                                {`${article.year} • ${article.season.description} • ${article.type.description} • ${article.age_rating.label}`}
                            </Paragraph>
                            <ArticleTags />
                            <Link to={`/${AppRoutes.ANIME_DETAILS}/${article.alias}?id=${article.id}`} onClick={onClick}>
                                <Button type="primary" >{t('Смотреть')}</Button>
                            </Link>
                        </div>
                    </section>
                    {article.poster.optimized.src && <img className={s.ImgCardContent} src={`${import.meta.env.VITE_IMG_URL}${article.poster.optimized.src}`} alt={article.name.main} />}
                </Card>
            </Col>
        </Row>
    )
})

export default ArticleListItem
