import { Button, Card, Flex, Input, Typography } from "antd"
import { memo } from "react"
import { NavbarNotReg } from "widgets/NavbarNotReg"
import s from './RegistrationPage.module.scss'
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { AppRoutes } from "shared/config/routeConfig/routeConfig"

const { Title, Text } = Typography;

export const RegistrationPage = () => {
    const { t } = useTranslation("Auth/RegistrationPage")
    return (
        <>
            <NavbarNotReg />
            <section className={s.wrappers}>
                <Flex align="center" justify="center" className={s.wrapper}>
                    <Title level={2}>
                        {t("Регистрация в личный кабинет")}
                    </Title>
                    <Text className={s.subtitle}>{t("Пожалуйста, введите данные для регистрации")}</Text>
                    <Card className={s.card}>
                        <Input
                            type=""
                            placeholder={t("Почта")}
                        />
                        <Input
                            type="password"
                            placeholder={t("Пароль")}
                        />
                        <Input
                            type="password"
                            placeholder={t("Подтвердите пароль")}
                        />

                        <Button size="large" type="primary">
                            {t("Регистрация")}
                        </Button>
                        <Flex justify="space-between" align="center">
                            <Link to={`/${AppRoutes.LOGIN}`}>{t("У вас уже есть аккаунт?")}</Link>
                            {/* <Button type="text" className={s.btn}>{t("переотправить письмо")}</Button> */}
                        </Flex>
                    </Card>
                </Flex>
            </section>
        </>
    )
}

export default memo(RegistrationPage)