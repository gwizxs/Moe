import { Button, Flex } from 'antd';
import s from './Navbar.module.scss';
import classNames from 'shared/library/classNames/classNames';
import Title from 'antd/es/typography/Title';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { NavbarItems } from 'widgets/NavbarNotReg/ui/NavbarItems/NavbarItems';
import { menu } from 'shared/constants/menu';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { SearchModal } from 'widgets/SearchModal/SearchModal';
import { useNavigate } from 'react-router-dom';
import { AppRoutes, RoutePath } from 'shared/config/routeConfig/routeConfig';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const navigate = useNavigate();
  
  return (
    <nav className={classNames(s.navbar, {}, [className])}>
      <Flex justify="space-between" align="center" className={s.row}>
        <Title level={3} className={s.text}>
          <span
           className={s.logo}
           onClick={() => navigate(RoutePath[AppRoutes.LANDING])}
          >Moe</span>
        </Title>
        <NavbarItems items={menu} isCollapsed={false} className={s.sidebar} />
        <Flex gap="small" align="center">
          <Button type="text" onClick={() => setIsSearchModalOpen(true)}>
            <Search size={24} />
          </Button>
          <ThemeSwitcher className={s.theme} />
          <LangSwitcher short className={s.lang} />
        </Flex>
      </Flex>

      <SearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
      />
    </nav>
  );
};

export default Navbar;
