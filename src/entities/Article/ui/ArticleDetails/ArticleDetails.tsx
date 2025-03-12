import { observer } from "mobx-react-lite"
import classNames from "shared/library/classNames/classNames"
import s from './ArticleDetails.module.scss'
import { Button, Card, Col, Descriptions, Row, Tag, Typography, Image } from "antd"
import { ReleaseDetailsAnime } from "shared/api/services/releases-anime-details/types"
import { useTranslation } from "react-i18next"

interface ArticleListItemProps {
    className?: string
    anime: ReleaseDetailsAnime;
}

const { Paragraph, Title } = Typography;

export const ArticleDetails = observer((props: ArticleListItemProps) => {
    const {
        className,
        anime,
    } = props
    const { t } = useTranslation()

    const Member = () => {
        return (
            <div className={s.membersContainer}>
                {anime?.members?.map((member) => (
                    <section key={member.id} className={s.member}>
                        <div className={s.memberInfo}>
                            <span className={s.nickname}>{member.nickname}</span>
                            <span className={s.role}>{member.role.description}</span>
                        </div>
                    </section>
                ))}
            </div>
        )
    }

    /*
    TODO: 
    при нажатии на карточку отправляем пользователя на эпизод, показываем плеер anime.episodes.hls_{значение качества которое выберет}
    отрисовываем название аниме и добавляем скип опенинга и эндинга, в виде перехода используем уникальный id для каждого плеера стор не меняется
    
    */
    const CardInfoSeries = () => {
        return (
            <section className={s.gridContainer}>
                {anime?.episodes?.map((episode) => (
                    <div
                        key={episode.ordinal}
                        className={s.episodeCard}
                        style={{
                            backgroundImage: episode.preview?.optimized?.src
                                ? `url(${import.meta.env.VITE_IMG_URL}${episode.preview.optimized.src})`
                                : "none",
                        }}
                    >
                        <div className={s.overlay}></div>
                        <div className={s.content}>
                            <Paragraph className={s.episodeTitle}>{episode.name}</Paragraph>
                            <div className={s.bottomSection}>
                                <Title level={4} className={s.episodeNumber}>
                                    {episode.ordinal} эпизод
                                </Title>
                                <Paragraph className={s.duration}>
                                    {`${Math.floor(episode.duration / 60)}:${String(episode.duration % 60).padStart(2, "0")}`}
                                </Paragraph>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        )
    }

    return (
        <>
            <Card className={classNames(s.AnimeCard, {}, [className])}>
                <Row gutter={[16, 16]}>
                    <Col flex="250px">
                        {anime?.poster?.optimized?.src && (
                            <Image
                                className={s.ImgCardContent}
                                src={`${import.meta.env.VITE_IMG_URL}${anime.poster.optimized.src}`}
                                alt={anime?.name.main}
                            />
                        )}
                    </Col>
                    <Col span={16} className={s.animeInfo}>
                        <Title level={1}>{anime?.name.main}</Title>
                        {anime?.name.english && <Paragraph>{anime?.name.english}</Paragraph>}

                        <div className={s.tagsContainer}>
                            <Tag>{anime?.age_rating.label}</Tag>
                            <Tag>{t("В избранном у")} {anime?.added_in_users_favorites} {t("пользователей")}</Tag>
                        </div>

                        <Descriptions column={1}>
                            <Descriptions.Item label={t("Тип")}>{anime?.type.value}</Descriptions.Item>
                            <Descriptions.Item label={t("Сезон")}>{anime?.season.value}</Descriptions.Item>
                            <Descriptions.Item label={t("Жанры")}>
                                {anime?.genres?.map((genre) => genre.name).join(" • ")}
                            </Descriptions.Item>
                            <Descriptions.Item label={t("Год выхода")}>{anime?.year}</Descriptions.Item>
                        </Descriptions>

                        <Button type="primary" className={s.watchButton}>
                            {t("Смотреть с 1 эпизода")}
                        </Button>
                    </Col>
                    {anime?.description && (
                        <Col span={24}>
                            <Paragraph className={s.description}>{anime?.description}</Paragraph>
                        </Col>
                    )}
                </Row>
            </Card>

            <Card className={s.cardInfoSer}>
                <CardInfoSeries />
            </Card>

            <Card className={s.cardInfoSer}>
                <Member />
            </Card>

        </>
    )
})

export default ArticleDetails;