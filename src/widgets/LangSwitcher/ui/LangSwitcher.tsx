
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import classNames from 'shared/library/classNames/classNames';
import { Button } from 'antd';

interface LangSwitcherProps {
    short?: boolean;
    className?: string 
}

export const LangSwitcher = observer(({ short, className }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const toggle = async () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <Button
        type='primary'
        onClick={toggle}
        className={classNames('', {}, [className])}>
            {t(short ? 'Короткий язык' : 'Язык')}
        </Button>
    );
});