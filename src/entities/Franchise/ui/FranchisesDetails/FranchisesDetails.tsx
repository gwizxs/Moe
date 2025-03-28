import { useTranslation } from "react-i18next";
import classNames from "shared/library/classNames/classNames";
import s from './FranchisesDetails.module.scss';
import { Link } from "react-router-dom";
import { AppRoutes } from "shared/config/routeConfig/routeConfig";
import { FranchisesDetailsResponse } from "shared/api/services/franchises-anime/franchises-details/types";
import { Typography, Skeleton, Card } from "antd";
import { observer } from "mobx-react-lite";

interface FranchisesDetailsProps {
    className?: string;
    franchise?: FranchisesDetailsResponse;
    isLoading?: boolean;
}

const { Title, Text } = Typography;

export const FranchisesDetails = observer((props: FranchisesDetailsProps) => {
    const {
        className,
        franchise,
        isLoading
    } = props;

    const { t } = useTranslation();

    if (isLoading) {
        return (
            <div className={classNames(s.FranchisesDetails, {}, [className, s.loading])}>
                <div className={s.franchiseInfo}>
                    <Skeleton.Image active className={s.poster} />
                    <div className={s.mainInfo}>
                        <Skeleton active paragraph={{ rows: 4 }} />
                    </div>
                </div>
                <Skeleton active paragraph={{ rows: 6 }} />
            </div>
        );
    }

    if (!franchise) {
        return <div className={classNames(s.FranchisesDetails, {}, [className])}>
            <Title level={4}>{t('Данные не найдены')}</Title>
        </div>;
    }

    const hasRequiredData = franchise.name && franchise.image?.optimized?.preview;
    if (!hasRequiredData) {
        console.error("Неполные данные франшизы:", franchise);
        return <div className={classNames(s.FranchisesDetails, {}, [className])}>
            <Title level={4}>{t('Неполные данные франшизы')}</Title>
        </div>;
    }

    const franchiseInfo = (
        <Card className={s.franchiseInfo}>
            <img 
                className={s.poster} 
                src={`${import.meta.env.VITE_IMG_URL}${franchise.image?.optimized?.preview}`} 
                alt={franchise?.name} 
            />
            <div className={s.mainInfo}>
                <Title level={3} className={s.title}>{franchise?.name}</Title>
                {franchise?.name_english && (
                    <Text className={s.subtitle}>{franchise?.name_english}</Text>
                )}
                <div className={s.stats}>
                    <Text>{franchise?.first_year} — {franchise?.last_year}</Text>
                    <div className={s.episodes}>
                        <Text className={s.episodesCount}>{franchise?.total_releases} {t('сезона')}</Text>
                        <Text className={s.dot}>•</Text>
                        <Text className={s.episodesCount}>{franchise?.total_episodes} {t('эпизодов')}</Text>
                    </div>
                    <Text className={s.duration}>{franchise?.total_duration}</Text>
                </div>
            </div>
        </Card>
    );

    const releasesList = franchise.franchise_releases?.length > 0 ? (
        <Card className={s.releasesList}>
            {franchise?.franchise_releases?.map((item, index) => (
                <Link
                    key={item.id}
                    to={`/${AppRoutes.ANIME_DETAILS}?id=${item.release_id}`}
                    className={s.releaseItem}
                >
                    <div className={s.releaseNumber}>#{index + 1}</div>
                    <div className={s.releaseCard}>
                        {item.release.poster?.optimized?.src && (
                            <img 
                                className={s.releasePoster} 
                                src={`${import.meta.env.VITE_IMG_URL}${item.release.poster.optimized.src}`} 
                                alt={item.release.name.main} 
                            />
                        )}
                        <div className={s.releaseInfo}>
                            <Title level={5} className={s.releaseTitle}>
                                {item.release.name.main}
                            </Title>
                            {item.release.name.english && (
                                <Text className={s.releaseSubtitle}>
                                    {item.release.name.english}
                                </Text>
                            )}
                            <div className={s.releaseDetails}>
                                <Text className={s.releaseYear}>{item.release.year}</Text>
                                <Text className={s.dot}>•</Text>
                                <Text className={s.releaseSeason}>{item.release.season.description}</Text>
                                <Text className={s.dot}>•</Text>
                                <Text className={s.releaseType}>{item.release.type.description}</Text>
                                {item.release.episodes_total && (
                                    <>
                                        <Text className={s.dot}>•</Text>
                                        <Text className={s.releaseEpisodes}>{item.release.episodes_total} {t('эпизодов')}</Text>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </Card>
    ) : (
        <div className={s.noReleases}>
            <Text>{t('Нет доступных релизов')}</Text>
        </div>
    );

    return (
        <div className={classNames(s.FranchisesDetails, {}, [className])}>
            {franchiseInfo}
            <Title level={2} className={s.sectionTitle}>{t('Содержание франшизы')}</Title>
            {releasesList}
        </div>
    );
});

export default FranchisesDetails;
