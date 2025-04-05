import { useState } from 'react';
import { Button, Flex, Typography } from 'antd';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import classNames from 'shared/library/classNames/classNames';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { SearchModal } from 'widgets/SearchModal/SearchModal';
import { NavbarItems } from 'widgets/NavbarNotReg/ui/NavbarItems/NavbarItems';
import { menu } from 'shared/constants/menu';
import { AppRoutes, RoutePath } from 'shared/config/routeConfig/routeConfig';
import s from './NavbarMobile.module.scss';

interface NavbarMobileProps {
  className?: string;
}

const { Title } = Typography;

export const NavbarMobile = ({ className }: NavbarMobileProps) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className={classNames(s.header, {}, [className])}>
        <Flex justify="space-between" align="center" gap="small" flex={1} className={s.headerContent}>
          <div className={s.logo}>
            <Title level={3} className={s.logoText}
              onClick={() => navigate(RoutePath[AppRoutes.LANDING])}
            >
              Moe
            </Title>
          </div>
          <Flex gap="small" align="center">
            <Button type="default" className={s.navButton} onClick={() => setIsSearchModalOpen(true)}>
              <Search className={s.navIcon} size={24} />
            </Button>
            <ThemeSwitcher className={s.theme} />
            <LangSwitcher short className={s.lang} />
          </Flex>
        </Flex>
      </header>

      <nav className={classNames(s.navbar, {}, [className])}>
        <Flex justify="center" align="center" className={s.navContent}>
          <NavbarItems items={menu} isCollapsed={true} className={s.navItems} />
        </Flex>
      </nav>

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </>
  );
};

export default NavbarMobile;
