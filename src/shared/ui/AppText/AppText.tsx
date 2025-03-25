import classNames from "shared/library/classNames/classNames";
import s from './AppText.module.scss'
import { Typography } from "antd";
interface AppTextProps {
    children: React.ReactNode;
    className?: string;
    props?: React.HTMLAttributes<HTMLParagraphElement>;
}

const { Text } = Typography

export const AppText = (props: AppTextProps) => {
    const {
        children,
        className,
        ...otherProps
    } = props

    return (
        <Text
            className={classNames(s.AppText, {}, [className])}
            {...otherProps}
        >
            {children}
        </Text>
    )
}

export default AppText;