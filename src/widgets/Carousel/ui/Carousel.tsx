import { Carousel as AntdCarousel, Typography, Button, Space, Tag } from "antd";
import s from './Carousel.module.scss'
import { useStore } from "app/providers/StoreProvider";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Anime, AnimeResponse } from "shared/api/services/catalog-anime-releases/types";
import { PlayCircleOutlined } from '@ant-design/icons';
import { useTranslation } from "react-i18next";
import { CarouselSkeleton } from "./CarouselSkeleton";
import { Link } from "react-router-dom";
import loaderFrame from "shared/assets/bg/loaderFrame.webp";

const { Title, Text } = Typography;

export const Carousel = observer(() => {
    const {
        catalogAnimeStoreReleases
    } = useStore()
    const { t } = useTranslation()

    useEffect(() => {
        catalogAnimeStoreReleases.getCatalogAnimeReleasesAction()
    }, [catalogAnimeStoreReleases])

    const isLoading = catalogAnimeStoreReleases.releasesData?.state === 'pending';
    const animeResponse = catalogAnimeStoreReleases.releasesData?.state === 'fulfilled'
        ? catalogAnimeStoreReleases.releasesData.value?.data || []
        : [];

    const renderBannerItem = (anime: Anime) => (
        <div key={anime.id} className={s.bannerItem}>
            <div className={s.bannerOverlay} />
            <div
                className={s.bannerImage}
                style={{ backgroundImage: anime.poster?.optimized?.src ? `url(${import.meta.env.VITE_IMG_URL}${anime.poster.optimized.src})` : `url(${loaderFrame})` }}
            />
            <div className={s.bannerContent}>
                <Title level={3} className={s.bannerTitle}>{anime.name.main}</Title>
                <Space className={s.bannerInfo}>
                    <Tag className={s.bannerYear}>{anime.year}</Tag>
                    <Tag className={s.bannerType}>{anime.type.description}</Tag>
                    <Tag className={s.bannerEpisodes}>{anime.episodes_total} {t("эпизодов")}</Tag>
                    {anime.is_ongoing && <Text className={s.bannerOngoing}>{t("Онгоинг")}</Text>}
                </Space>
                <Title level={5} className={s.bannerDescription} ellipsis={{ rows: 3 }}>
                    {anime.description}
                </Title>
                <Link to={`anime-details/${anime.alias}?id=${anime.id}`}>
                    <Button
                        type="primary"
                        size="large"
                        icon={<PlayCircleOutlined size={24} />}
                        className={s.watchButton}
                    >
                        {t("Смотреть")}
                    </Button>
                </Link>
            </div>
        </div>
    );

    return (
        <>
            {isLoading ? (
                <CarouselSkeleton />
            ) : (
                <>
                    <div className={s.bannerContainer}>
                        <AntdCarousel
                            className={s.banner}
                            autoplay
                            effect="fade"
                            arrows
                            autoplaySpeed={2000}
                        >
                            {animeResponse.map((animeResp: AnimeResponse) => {
                                const anime = animeResp as unknown as Anime;
                                return renderBannerItem(anime);
                            })}
                        </AntdCarousel>
                    </div>
                </>
            )}
        </>
    );
});