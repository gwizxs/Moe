import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next"
import classNames from "shared/library/classNames/classNames"
import s from './ArticleListItem.module.scss'
import { Button, Card, Col, Row, Tag, Typography } from "antd"
import { Anime } from "shared/api/services/releases-anime-catalog/types"
import { ArticleView } from "entities/Article"
interface ArticleListItemProps {
    className?: string
    article: Anime
    view: ArticleView
}

const { Paragraph, Title } = Typography;

export const ArticleListItem = observer((props: ArticleListItemProps) => {
    const {
        className,
        article,
        view
    } = props

    const { t } = useTranslation('Projects')

    const ArticleTags = () => {
        return (
            <div className={s.tags}>
                {article.genres.map((genre) => (
                    <Tag key={genre.id} className={s.tag}>
                        {genre.name}
                    </Tag>
                ))}
            </div>
        )
    }

    if (view === ArticleView.BIG) {
        return (
            <Row
            className={classNames(s.ArticleListItem, {}, [className, s.BIG])}
            gutter={16}
            wrap={false}
        >
            <Col key={article.id} className={s.col}>
                <Card className={s.CardContent} hoverable cover={article.poster.optimized.src && <img className={s.ImgCardContent} src={`${import.meta.env.VITE_IMG_URL}${article.poster.optimized.src}`} alt={article.name.main} />}>
                    <div className={s.episodeTag}>{article.episodes_total} эпизод</div>
                    <div className={s.animeInfo}>
                        <Title level={4} className={s.title}>{article.name.main}</Title>
                        <Title level={5} type="secondary" className={s.subtitle}>
                            {article.name.english} ({article.year})
                        </Title>
                        <div className={s.tagsContainer}>
                            <Tag color="red" className={s.ageRating}>{article.age_rating.label}</Tag>
                            {article.genres.map((tag) => (
                                <Tag key={tag.id} className={s.tag}>{tag.name}</Tag>
                            ))}
                        </div>
                        <Paragraph className={s.description}>{article.description}</Paragraph>
                        <div className={s.genres}>
                            {article.genres.map((genre) => (
                                <Tag key={genre.name} color="blue" className={s.genreTag}>{genre.name}</Tag>
                            ))}
                        </div>
                        <Button type="primary" className={s.watchButton}>Смотреть</Button>
                    </div>
                </Card>
            </Col>
        </Row>
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
                            <Button type="primary" >{t('Смотреть')}</Button>
                        </div>
                    </section>
                    {article.poster.optimized.src && <img className={s.ImgCardContent} src={`${import.meta.env.VITE_IMG_URL}${article.poster.optimized.src}`} alt={article.name.main} />}
                </Card>
            </Col>
        </Row>
    )
})

export default ArticleListItem