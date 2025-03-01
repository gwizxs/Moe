import { Article, ArticleStatus, ArticleView } from "../../model/types/article"
import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next"
import classNames from "shared/library/classNames/classNames"
import s from './ArticleListItem.module.scss'
import { Avatar, Card, Col, Row, Space } from "antd"
import { UserRound } from "lucide-react"

interface ArticleListItemProps {
    className?: string
    article: Article
    view: ArticleView
}

export const ArticleListItem = observer((props: ArticleListItemProps) => {
    const {
        className,
        article,
        view
    } = props

    const { t } = useTranslation('Projects')

    if (view === ArticleView.BIG) {
        return (
            <Row
                className={classNames(s.ArticleListItem, {}, [className, s[view]])}
                gutter={16}
                wrap={false}
            >
                <Col key={article.id} className={s.col}>
                    <Card className={s.CardContent}>
                        <Space wrap size={16} className={s.cardHeader}>
                            <Avatar size={64}>
                                <img className={s.ImgCardContent} src={article.icon} alt={article.title} />
                            </Avatar>
                            <div>
                                <h2 className={s.textTitle}>{article.title}</h2>
                                <h6>{article.subtitle}</h6>
                            </div>
                        </Space>
                        <p className={s.descriptionCard}>{article.description}</p>
                        <div className={article.status === ArticleStatus.VACANCIES
                            ? s.vacancyTextRed
                            : s.vacancyTextBlack}
                        >
                            <Space className={s.space} align="center" direction="horizontal">
                                <UserRound className={s.icon} size={16} />
                                <span>
                                    {article.status === ArticleStatus.VACANCIES
                                        ? t('Есть вакансии')
                                        : t('Нет вакансий')}
                                </span>
                            </Space>
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
                    <Space wrap size={16} className={s.cardHeader}>
                        <Avatar size={64}>
                            <img className={s.ImgCardContent} src={article.icon} alt={article.title} />
                        </Avatar>
                        <div>
                            <h2 className={s.textTitle}>{article.title}</h2>
                            <h6>{article.subtitle}</h6>
                        </div>
                    </Space>
                    <p className={s.descriptionCard}>{article.description}</p>
                    <div className={article.status === ArticleStatus.VACANCIES
                        ? s.vacancyTextRed
                        : s.vacancyTextBlack}
                    >
                        <Space className={s.space} align="center" direction="horizontal">
                            <UserRound className={s.icon} size={16} />
                            <span>
                                {article.status === ArticleStatus.VACANCIES
                                    ? t('Есть вакансии')
                                    : t('Нет вакансий')}
                            </span>
                        </Space>
                    </div>
                </Card>
            </Col>
        </Row>

    )
})

export default ArticleListItem