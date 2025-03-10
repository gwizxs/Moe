import { ArticleView } from "../../model/types/article"
import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next"
import classNames from "shared/library/classNames/classNames"
import s from './ArticleListItem.module.scss'
import { Button, Card, Col, Row, Tag, Typography } from "antd"
import { Anime } from "shared/api/services/releases-anime-catalog/types"
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

    // if (view === ArticleView.BIG) {
    //     return (
    //         <Row
    //             className={classNames(s.ArticleListItem, {}, [className, s[view]])}
    //             gutter={16}
    //             wrap={false}
    //         >
    //             <Col key={article.id} className={s.col}>
    //                 <Card className={s.CardContent}>
    //                     <Space wrap size={16} className={s.cardHeader}>
    //                         <Avatar size={64}>
    //                             <img className={s.ImgCardContent} src={article.icon} alt={article.title} />
    //                         </Avatar>
    //                         <div>
    //                             <h2 className={s.textTitle}>{article.title}</h2>
    //                             <h6>{article.subtitle}</h6>
    //                         </div>
    //                     </Space>
    //                     <p className={s.descriptionCard}>{article.description}</p>
    //                     <div className={article.status === ArticleStatus.VACANCIES
    //                         ? s.vacancyTextRed
    //                         : s.vacancyTextBlack}
    //                     >
    //                         <Space className={s.space} align="center" direction="horizontal">
    //                             <UserRound className={s.icon} size={16} />
    //                             <span>
    //                                 {article.status === ArticleStatus.VACANCIES
    //                                     ? t('Есть вакансии')
    //                                     : t('Нет вакансий')}
    //                             </span>
    //                         </Space>
    //                     </div>
    //                 </Card>
    //             </Col>
    //         </Row>
    //     )
    // }

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
                            <Paragraph>
                                {`${article.year} • ${article.season.description} • ${article.type.description} • ${article.age_rating.label}`}
                            </Paragraph>
                            <div>
                                {article.genres.map((genre) => (
                                    <Tag key={genre.id} className={s.tag}>
                                        {genre.name}
                                    </Tag>
                                ))}
                            </div>
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