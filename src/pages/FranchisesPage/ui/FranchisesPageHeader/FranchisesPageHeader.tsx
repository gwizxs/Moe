import { Flex, Input, Typography } from "antd"
import s from './FranchisesPage.module.scss'
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
const { Text } = Typography;
export const FranchisesPageHeader = () => {
    const { t } = useTranslation();
    return (
        <section className={s.FranchisesPageHeader}>
            <Flex justify="space-between" align="center" gap={16}>
                <Text className={s.title}>{t("Франшизы")}</Text>
                <Flex align="center" gap={16}>
                    <Input 
                        placeholder="Поиск" 
                        className={s.search}
                        prefix={<Search size={16} />} 
                    />
                </Flex>
            </Flex>
        </section>
    )
}
