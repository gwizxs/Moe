import { Button, Card, Flex, Input, Typography } from "antd"
import { memo } from "react"
import { Navbar } from "widgets/NavbarNotReg"
import s from './NewPasswordPage.module.scss'
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { AppRoutes } from "shared/config/routeConfig/routeConfig"

const { Title, Text } = Typography;

export const NewPasswordPage = () => {
    const { t } = useTranslation("Auth/NewPasswordPage")
    return (
        <>
            <Navbar />
            <section className={s.wrappers}>
                <Flex align="center" justify="center" className={s.wrapper}>
                    <Title level={2}>
                        {t("Восстановление пароля")}
                    </Title>
                    <Text className={s.subtitle}>
                        {t("Пожалуйста, укажите Ваш Email. На этот адрес будет направлен новый пароль для входа в личный кабинет.")}
                    </Text>
                <Card className={s.card}>
                    <Input placeholder={t("Почта")} />
                    <Button size="large" type="primary">
                        {t("Восстановить пароль")}
                    </Button>
                    <Flex justify="center" align="center">
                        <Link to={`/${AppRoutes.REGISTRATION}`}>{t("Нет личного кабинета?")}</Link>
                    </Flex>
                </Card>
                </Flex>
            </section>
        </>
    )
}

export default memo(NewPasswordPage)