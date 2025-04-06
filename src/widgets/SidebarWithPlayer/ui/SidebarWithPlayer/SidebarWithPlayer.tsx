import { Menu, MenuProps } from "antd"
import s from './SidebarWithPlayer.module.scss'
import classNames from "shared/library/classNames/classNames"

interface SidebarWithPlayerProps {
    className?: string;
    items: MenuProps['items'];
}

// const SidebarItems = (items: MenuProps['items']) => {
//     return items.map((item) => ({
//         ...item,
//         children: item.children?.map((child) => ({ ...child, children: child.children }))
//     }))
// }

export const SidebarWithPlayer = (props: SidebarWithPlayerProps) => {
    const { className, items } = props;
    return (
        <menu className={classNames(s.SidebarWithPlayer, {}, [className])}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['231']}
                className={s.menu}
                items={items}
            />
        </menu>
    )
}