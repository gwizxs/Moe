import { Flex, Input, Typography } from "antd"
import s from './FranchisesPage.module.scss'
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const { Text } = Typography;

interface FranchisesPageHeaderProps {
    onSearch: (query: string) => void;
}

export const FranchisesPageHeader = ({ onSearch }: FranchisesPageHeaderProps) => {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState("");
    
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch(query);
    };

    return (
        <section className={s.FranchisesPageHeader}>
            <Flex justify="space-between" align="center" gap={16}>
                <Text className={s.title}>{t("Франшизы")}</Text>
                <Flex align="center" gap={16}>
                    <Input 
                        placeholder={t("Поиск")}
                        className={s.search}
                        prefix={<Search size={16} />}
                        value={searchQuery}
                        onChange={handleSearch}
                        allowClear
                    />
                </Flex>
            </Flex>
        </section>
    )
}
