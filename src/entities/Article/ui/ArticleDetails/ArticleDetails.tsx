import { observer } from "mobx-react-lite"
import classNames from "shared/library/classNames/classNames"
import s from './ArticleDetails.module.scss'
import { Button, Card, Tag, Typography } from "antd"
import { ReleaseDetailsAnime } from "shared/api/services/releases-anime-details/types"
import { useTranslation } from "react-i18next"

interface ArticleListItemProps {
    className?: string
    anime: ReleaseDetailsAnime;
    id: string
}

const { Paragraph, Title } = Typography;

export const ArticleDetails = observer((props: ArticleListItemProps) => {
    const {
        className,
        anime,
        id,
    } = props
    const { t } = useTranslation()

    const Member = () => {
        return (
            <>
                {anime.members.map((member) => (
                    <Card key={member.id}>
                        {member.nickname}
                        {member.role.description}
                    </Card>
                ))}
            </>
        )
    }

    /*
    TODO: 
    при нажатии на карточку отправляем пользователя на эпизод, показываем плеер anime.episodes.hls_{значение качества которое выберет}
    отрисовываем название аниме и добавляем скип опенинга и эндинга, в виде перехода используем уникальный id для каждого плеера стор не меняется
    
    */
    const CardInfoSeries = () => {
        return (
            <>
                {anime.episodes.map((episode) => (
                    <section>
                        <div>
                            <Title level={3}>
                                {episode.name}
                            </Title>
                            <Paragraph>
                                {Math.ceil(episode.duration / 60)}
                            </Paragraph>
                        </div>
                        {episode.preview.optimized.src && <img className={s.ImgCardContent} src={`${import.meta.env.VITE_IMG_URL}${episode.preview.optimized.src}`} alt={episode.name} />}
                    </section>
                ))}
                
            </>
        )
    }

    return (
        <Card className={classNames(s.CardContent, {}, [className])}>
            <section className={s.date}>
                <div>
                    {anime.poster.optimized.src && <img className={s.ImgCardContent} src={`${import.meta.env.VITE_IMG_URL}${anime.poster.optimized.src}`} alt={anime.name.main} />}
                </div>
                <div>
                    <Title level={3}>
                        {anime.name.main}
                    </Title>
                    <Paragraph>
                        {anime.name.english}
                    </Paragraph>
                </div>
                <Tag>
                    {anime.age_rating.label}
                </Tag>
                <Tag>
                    {t("В избранном у")} {anime.added_in_users_favorites} {t("пользователей")}
                </Tag>
                <Paragraph>
                    {t("Тип")} {anime.type.value}
                    {t("Сезон")} {anime.season.value}
                    {t("Жанры")} {anime.genres.map((genre) => genre.name).join("• ")}
                </Paragraph>
                <Paragraph>
                    {t("Год выхода")} {anime.year}
                </Paragraph>
                <Button>
                    {t("Смотреть с 1 эпизода")}
                </Button>
                <Paragraph>
                    {anime.description}
                </Paragraph>
                <section>
                    <CardInfoSeries />
                </section>
                <Member />
            </section>
        </Card>
    )
})

export default ArticleDetails;