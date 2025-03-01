import { Button, Card, Flex, Input, Typography } from "antd"
import { memo } from "react"
import { Navbar } from "widgets/NavbarNotReg"
import s from './ResetPasswordPage.module.scss'
import { useTranslation } from "react-i18next"

const { Title, Text } = Typography;

export const ResetPasswordPage = () => {
    const { t } = useTranslation("Auth/ResetPasswordPage")
    return (
        <>
        <Navbar />
        <section className={s.wrappers}>
            <Flex align="center" justify="center" className={s.wrapper}>
                <Title level={2}>
                {t("Восстановление пароля")}
                </Title>
                <Text className={s.subtitle}>{t("Пожалуйста, введите новый пароль")}</Text>
            <Card className={s.card}>
                <Input placeholder={t("Пароль")} />
                <Input type="password" placeholder={t("Подтвердите пароль")} />
                <Button size="large" type="primary">
                    {t("Восстановить пароль")}
                </Button>
            </Card>
            </Flex>
        </section>
    </>
    )
}

export default memo(ResetPasswordPage)