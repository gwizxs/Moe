import classNames from "shared/library/classNames/classNames";
import s from './AppText.module.scss'
import { Flex, Typography } from "antd";
import { HTMLAttributes, ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
interface AppTextProps {
    children: ReactNode;
    className?: string;
    props?: HTMLAttributes<HTMLParagraphElement>;
    link?: string;
}

const { Text } = Typography

export const AppText = (props: AppTextProps) => {
    const {
        children,
        className,
        link,
        ...otherProps
    } = props

    return (
        <Text
            className={classNames(s.AppText, {}, [className])}
            {...otherProps}
        >
            <Link to={link || ""}>
                <Flex align="center" justify="center" gap={8}>
                    {children}
                    <ChevronRight className={s.chevron} />
                </Flex>
            </Link>
        </Text>
    )
}

export default AppText;