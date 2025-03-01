import { Flex } from 'antd';
import s from './NavbarNotReg.module.scss';
import classNames from "shared/library/classNames/classNames";
import Title from 'antd/es/typography/Title';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';


interface NavbarProps {
  className?: string;
}

export const NavbarNotReg = ({ className }: NavbarProps) => {
  return (
    <nav className={classNames(s.navbar, {}, [className])}>
      <Flex justify="space-between" align="center" className={s.row}>
        <Title level={4} className={s.textExtr}>
          Moe
        </Title>
        <Flex gap="small">
          <ThemeSwitcher className={s.theme} />
          <LangSwitcher short />
        </Flex>
      </Flex>
    </nav>
  )
};

export default NavbarNotReg;
