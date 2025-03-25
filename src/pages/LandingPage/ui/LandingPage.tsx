import { Page } from "widgets/Page/Page"
import { Carousel } from "widgets/Carousel/ui/Carousel"
import classNames from "shared/library/classNames/classNames"
import s from './LandingPage.module.scss'
import AppText from "shared/ui/AppText/AppText"
import { useTranslation } from "react-i18next"
import { ArticleList } from "entities/Article"
import { useStore } from "app/providers/StoreProvider"
import { useEffect } from "react"
import { Flex, Typography } from "antd"
import { observer } from "mobx-react-lite"
import { RandomFranchisesResponse } from "shared/api/services/franchises-anime/random-franchises/types"
import { FranchisesList } from "entities/Franchise"

interface LandingPageProps {
    className?: string
}

const { Text } = Typography

export const LandingPage = observer((props: LandingPageProps) => {
    const { releasesStoreAnime, franchisesStoreAnime } = useStore()
    const { t } = useTranslation()
    const {
        className
    } = props

    useEffect(() => {
        const fetchData = async () => {
            await releasesStoreAnime.getReleasesAnimeLimitAction();
            await franchisesStoreAnime.getFranchisesAnimeAction()
        };
        fetchData();
    }, [franchisesStoreAnime, releasesStoreAnime]);

    if (releasesStoreAnime.releasesDataLimit?.state === "rejected") {
        return <Text>{t("Ошибка загрузки данных")}</Text>;
    }

    return (
        <Page className={classNames(s.LandingPage, {}, [className])}>
            <Carousel />
            <Flex vertical gap={16}>
                <AppText >
                    {t('Релизы')}
                </AppText>
                <ArticleList
                    isLoading={
                        releasesStoreAnime.releasesDataLimit?.state === "pending"
                    }
                    articles={
                        releasesStoreAnime.releasesDataLimit?.value?.data || []
                    }
                />
            </Flex>
            <Flex vertical gap={16}>
                <AppText >
                    {t('Франшизы')}
                </AppText>
                <FranchisesList
                    className={s.franchisesList}
                    isLoading={
                        franchisesStoreAnime.franchisesData?.state === "pending"
                    }
                    franchises={
                        franchisesStoreAnime.franchisesData?.value as RandomFranchisesResponse
                    }
                />
            </Flex>
        </Page>
    )
})

export default LandingPage