import { Flex } from 'antd';
import s from './Navbar.module.scss';
import classNames from "shared/library/classNames/classNames";
import Title from 'antd/es/typography/Title';
import { AlignJustify, Bell } from 'lucide-react'


interface NavbarProps {
  toggleCollapse: () => void;
  className?: string;
}

export const Navbar = ({ className, toggleCollapse }: NavbarProps) => {
  return (

    <nav className={classNames(s.navbar, {}, [className])}>
      <Flex justify="space-between" align="center" className={s.row}>
        <Flex gap="small">
          <AlignJustify
            size={32}
            className={s.burMenu}
            onClick={toggleCollapse}
          />
          <Title level={3}>
            Moe
          </Title>
        </Flex>
        <Flex gap="small">
          <Bell className={s.bell} />
        </Flex>
      </Flex>
    </nav>

  );
};

export default Navbar;
