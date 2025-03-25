import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next"
import classNames from "shared/library/classNames/classNames"
import s from './FranchisesItem.module.scss'
import { Card, Space, Typography } from "antd"
import { Link } from "react-router-dom"
import { AppRoutes } from "shared/config/routeConfig/routeConfig"
import { FranchisesResponse } from "shared/api/services/franchises-anime/types"

interface FranchisesItemProps {
    className?: string;
    franchise?: FranchisesResponse[0];
}

const { Text } = Typography;

export const FranchisesItem = observer((props: FranchisesItemProps) => {
    const {
        className,
        franchise,    
    } = props

    const { t } = useTranslation()

    const duration = franchise?.total_duration?.replace(/\d+/g, (match: string) => t(match));

    return (
        <Link 
            to={`/${AppRoutes.ANIME_DETAILS}/${franchise?.id}`}
            className={classNames(s.FranchisesItem, {}, [className])}
        >
            <Card
                className={s.card}
                cover={
                    <div className={s.imageWrapper}>
                        <img 
                            className={s.image} 
                            src={`${import.meta.env.VITE_IMG_URL}${franchise?.image.optimized.preview}`} 
                            alt={franchise?.name}
                            loading="lazy"
                        />
                    </div>
                }
            >
                <div className={s.content}>
                    <div>
                        <Text  className={s.title}>
                            {franchise?.name}
                        </Text>
                        {franchise?.name_english && (
                            <Text className={s.subtitle}>
                                {franchise?.name_english}
                            </Text>
                        )}
                    </div>
                    <Space direction="vertical" size={4} className={s.info}>
                        <div className={s.years}>
                            {franchise?.first_year} — {franchise?.last_year}
                        </div>
                        <Space className={s.stats} size={8}>
                            <Text>{franchise?.total_releases} {t('сезона')}</Text>
                            <Text>•</Text>
                            <Text>{franchise?.total_episodes} {t('эпизодов')}</Text>
                        </Space>
                        {franchise?.total_duration && (
                            <Text className={s.duration}>{duration}</Text>
                        )}
                    </Space>
                </div>
            </Card>
        </Link>
    )
})

export default FranchisesItem
