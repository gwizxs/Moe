import { Button, Flex } from 'antd';
import s from './Navbar.module.scss';
import classNames from 'shared/library/classNames/classNames';
import Title from 'antd/es/typography/Title';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { SidebarItems } from 'widgets/Sidebar';
import { menu } from 'shared/constants/menu';
import { Search } from 'lucide-react';


interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {

  return (
    <nav className={classNames(s.navbar, {}, [className])}>
      <Flex justify="space-between" align="center" className={s.row}>
        <Title level={3} className={s.textExtr}>
          <span className={s.logo}>Moe</span>
        </Title>
        <SidebarItems items={menu} isCollapsed={false} className={s.sidebar} />
        <Flex gap="small" align="center">
          <Button type="text">
            <Search className={s.bell} size={24} />
          </Button>
          <ThemeSwitcher className={s.theme} />
          <LangSwitcher short className={s.lang} />
        </Flex>
      </Flex>
    </nav>
  );
};

export default Navbar;
