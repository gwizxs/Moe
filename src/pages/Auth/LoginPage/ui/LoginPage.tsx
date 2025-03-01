import { Button, Card, Flex, Input, Typography } from "antd"
import { memo } from "react"
import { Navbar } from "widgets/NavbarNotReg"
import s from './LoginPage.module.scss'
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { AppRoutes } from "shared/config/routeConfig/routeConfig"

const { Title, Text } = Typography;

export const LoginPage = () => {
    const { t } = useTranslation("Auth/LoginPage")
    return (
        <>
            <Navbar />
            <section className={s.wrappers}>
                <Flex align="center" justify="center" className={s.wrapper}>
                    <Title level={2}>
                        {t("Вход в личный кабинет")}
                    </Title>
                    <Text className={s.subtitle}>{t("Пожалуйста, введите данные для входа")}</Text>
                <Card className={s.card}>
                    <Input placeholder={t("Почта")} />
                    <Input type="password" placeholder={t("Пароль")} />
                    <Button size="large" type="primary">
                        {t("Войти")}
                    </Button>
                    <Flex justify="space-between" align="center">
                        <Link to={`/${AppRoutes.NEW_PASSWORD}`}>{t("Забыли пароль?")}</Link>
                        <Link to={`/${AppRoutes.REGISTRATION}`}>{t("Нет личного кабинета?")}</Link>
                    </Flex>
                </Card>
                </Flex>
            </section>
        </>

    )
}

export default memo(LoginPage)