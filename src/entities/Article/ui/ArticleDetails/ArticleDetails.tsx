import { observer } from "mobx-react-lite"
import classNames from "shared/library/classNames/classNames"
import s from './ArticleDetails.module.scss'
import { Button, Card, Col, Descriptions, Row, Tag, Typography, Image } from "antd"
import { Episode, ReleaseDetailsAnime } from "shared/api/services/releases-anime-details/types"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { AppRoutes } from "shared/config/routeConfig/routeConfig"
import loaderFrame from "shared/assets/bg/loaderFrame.webp";
import VirtualList from "rc-virtual-list";
import { useEffect, useRef, useMemo, useState, useCallback } from "react"
import debounce from "lodash.debounce"
import { useUpdateDimensions } from "shared/library/hooks/useUpdateDimensions"

interface ArticleListItemProps {
    className?: string
    anime: ReleaseDetailsAnime | null;
    onEpisodeClick?: () => void;
}

const ITEM_HEIGHT = 320;

const { Paragraph, Title } = Typography;

export const ArticleDetails = observer((props: ArticleListItemProps) => {
    const {
        className,
        anime,
        onEpisodeClick,
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

    const CardInfoSeries = () => {
        const containerRef = useRef<HTMLDivElement>(null);
        const [containerHeight, setContainerHeight] = useState(800);
        const [itemsPerRow, setItemsPerRow] = useState(2);

        const updateDimensions = useUpdateDimensions(
            containerRef,
            setContainerHeight,
            setItemsPerRow,
            {
                minHeight: 600,
                bottomOffset: 40,
                mobileItemsPerRow: 2,
                tabletItemsPerRow: 4,
                breakpoints: { xl: 1920, lg: 1440, md: 1200 },
                itemsPerBreakpoint: { xl: 6, lg: 5, md: 4, sm: 3 }
            }
        );

        useEffect(() => {
            updateDimensions();
            
            const handleResize = debounce(() => {
                updateDimensions();
            }, 800);

            
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, [updateDimensions]);

        const rows = useMemo(() => {
            if (!anime?.episodes?.length) return [];
            
            const result = [];
            for (let i = 0; i < anime.episodes.length; i += itemsPerRow) {
                const rowItems = anime.episodes.slice(i, i + itemsPerRow);
                result.push(rowItems);
            }
            return result;
        }, [itemsPerRow]);

        const getRowKey = useCallback((row: Episode[]) => {
            return row.map(item => item.id).join('-');
        }, []);

        if (!anime?.episodes?.length) {
            return (
                <div className={s.emptyState}>
                    {t("Эпизоды не найдены")}
                </div>
            );
        }
        
        return (
            <section className={s.seriesContainer} ref={containerRef}>
                <VirtualList
                    data={rows}
                    height={containerHeight}
                    itemHeight={ITEM_HEIGHT}
                    itemKey={getRowKey}
                    className={s.virtualList}
                    showScrollBar={false}
                >
                    {(row: Episode[]) => (
                        <div className={s.episodeRow}>
                            {row.map((episode) => (
                                <Link
                                    to={{
                                        pathname: `/${AppRoutes.ANIME_DETAILS_VIDEO}/${anime.alias}`,
                                        search: `id=${anime.id}&sort_order=${episode.sort_order}`,
                                    }}
                                    key={episode.id}
                                    className={s.episodeCard}
                                    onClick={onEpisodeClick}
                                    style={{
                                        backgroundImage: episode.preview?.optimized?.src
                                            ? `url(${import.meta.env.VITE_IMG_URL}${episode.preview.optimized.src})`
                                            : `url(${loaderFrame})`,
                                    }}
                                >
                                    <div className={s.overlay}></div>
                                    <div className={s.content}>
                                        <Paragraph style={{ color: "var(--inverted-bg-color)" }} className={s.episodeTitle}>{episode.name}</Paragraph>
                                        <div className={s.bottomSection}>
                                            <Title level={4} style={{ color: "var(--inverted-bg-color)" }} className={s.episodeNumber}>
                                                {episode.ordinal} {t("эпизод")}
                                            </Title>
                                            <Paragraph style={{ color: "var(--inverted-bg-color)" }} className={s.duration}>
                                                {`${Math.floor(episode.duration / 60)}:${String(episode.duration % 60).padStart(2, "0")}`}
                                            </Paragraph>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </VirtualList>
            </section>
        )
    }

    return (
        <>
            <Card className={classNames(s.AnimeCard, {}, [className])}>
                <Row gutter={[16, 16]}>
                    <Col flex="15.625rem">
                        {anime?.poster?.optimized?.src && (
                            <Image
                                className={s.ImgCardContent}
                                src={`${import.meta.env.VITE_IMG_URL}${anime.poster.optimized.src}`}
                                alt={anime?.name.main}
                            />
                        )}
                    </Col>
                    <Col span={16} className={s.animeInfo}>
                        <Title level={1}>{anime?.name?.main}</Title>
                        <Paragraph>{anime?.name.english}</Paragraph>

                        <div className={s.tagsContainer}>
                            <Tag>{anime?.age_rating.label}</Tag>
                            <Tag>{t("В избранном у")} {anime?.added_in_users_favorites} {t("пользователей")}</Tag>
                        </div>

                        <Descriptions
                            column={1}
                            labelStyle={{ color: "var(--inverted-primary-color)" }}
                            contentStyle={{ color: "var(--inverted-primary-color)" }}
                        >
                            <Descriptions.Item label={t("Тип")}>{anime?.type.value}</Descriptions.Item>
                            <Descriptions.Item label={t("Сезон")}>{anime?.season.value}</Descriptions.Item>
                            <Descriptions.Item label={t("Жанры")}>
                                {anime?.genres?.map((genre) => genre.name).join(" • ")}
                            </Descriptions.Item>
                            <Descriptions.Item label={t("Год выхода")}>{anime?.year}</Descriptions.Item>
                        </Descriptions>
                        <Link
                            to={{
                                pathname: `/${AppRoutes.ANIME_DETAILS_VIDEO}/${anime?.alias}`,
                                search: `id=${anime?.id}&sort_order=1`,
                            }}
                            target="_blank"
                            onClick={onEpisodeClick}
                        >
                            <Button
                                type="primary"
                                className={s.watchButton}
                        >
                            {t("Смотреть с 1 эпизода")}
                        </Button>
                        </Link>
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