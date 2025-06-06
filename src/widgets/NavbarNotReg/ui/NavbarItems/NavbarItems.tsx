import { NavLink } from 'react-router-dom';
import s from './NavbarItems.module.scss';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from 'app/providers/StoreProvider';

interface MenuItem {
    id: number;
    text: string;
    url: string;
    icon: ReactNode;
}

interface SidebarMenuProps {
    items: MenuItem[];
    isCollapsed: boolean;
    className?: string;
}

export const NavbarItems = observer(({ items, isCollapsed }: SidebarMenuProps) => {
    return (
        <ul className={s.menu}>
            <NavbarList items={items} isCollapsed={isCollapsed} />
        </ul>
    );
});

const NavbarList = observer((props: SidebarMenuProps) => {
    const {
        items,
        isCollapsed
    } = props
    const { sidebarStore } = useStore();
    const { t } = useTranslation();

    const handleMenuClick = (id: number) => {
        sidebarStore.setSelectedKey(id);
    };

    return (
        <>
            {items.map(({ id, url, text, icon }) => (
                <li
                    key={url}
                    className={classNames(s.menuItem, {
                        [s.active]: sidebarStore.selectedKey === id,
                    })}
                >
                    <NavLink to={url} className={s.link} onClick={() => handleMenuClick(id)}>
                        <div className={s.icon}>{icon}</div>
                        {!isCollapsed && <span className={s.label}>{t(text)}</span>}
                    </NavLink>
                </li>
            ))}
        </>
    );
});

export default NavbarItems;