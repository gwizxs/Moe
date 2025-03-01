import { Card, Checkbox, Flex, Input, Radio } from "antd"
import s from './Filter.module.scss'
import { FilterIcon } from "lucide-react";
import { useTranslation } from "react-i18next";


const options = [
    { label: 'C++', value: 'C++' },
    { label: 'HTML', value: 'HTML' },
    { label: 'React', value: 'React' },
    { label: 'C#', value: 'C#' },
    { label: 'Figma', value: 'Figma' },
    { label: 'Go', value: 'Go' },
    { label: 'Java', value: 'Java' },
    { label: 'Python', value: 'Python' },
];


export const Filter = () => {
    const { t } = useTranslation('Vacancy');
    return (
        <Flex vertical className={s.cardWrapper}>
            <Card className={s.Card}>
                <Flex align="center" className={s.filterSpan}>
                    <FilterIcon width={20} height={20} />
                    <h1 className={s.filterCol}>{t("ФИЛЬТР")}</h1>
                </Flex>
                <Flex vertical className={s.filterCol} gap={8}>
                    <h3 className={s.text}>{t("СТЕК ТЕХНОЛОГИЙ")}</h3>
                    <Input placeholder={t("Название технологии")} />
                </Flex>
                <Flex vertical className={s.paddingRow}>
                    <Checkbox.Group
                        options={options}
                        className={s.radio}
                    />
                </Flex>
                <Flex vertical className={s.filterCol} gap={8}>
                    <h3 className={s.text}>{t("ОПЫТ РАБОТЫ")}</h3>
                    <Radio.Group
                        className={s.radio}
                    >
                        <Radio value={1}>{t("Не имеет значение")}</Radio>
                        <Radio value={2}>{t("От 1 до 3 месяцев")}</Radio>
                        <Radio value={3}>{t("от 3 до 6 месяцев")}</Radio>
                        <Radio value={4}>{t("От 6 месяцев до 1 года")}</Radio>
                        <Radio value={5}>{t("Более 1 года")}</Radio>
                    </Radio.Group>
                </Flex>
            </Card>
        </Flex>

    )
}
