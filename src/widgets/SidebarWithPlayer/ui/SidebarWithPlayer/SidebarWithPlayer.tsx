import { Menu, MenuProps, Typography } from "antd"
import s from './SidebarWithPlayer.module.scss'
import classNames from "shared/library/classNames/classNames"
import { useTranslation } from "react-i18next"
import { Episode } from "shared/api/services/releases-anime-details/types"
import { observer } from "mobx-react-lite"
import { useEffect, useRef } from "react"

const { Title } = Typography;

interface SidebarWithPlayerProps {
    className?: string;
    episodes: Episode[];
    currentEpisode?: number;
    onEpisodeSelect?: (episode: Episode) => void;
    isVisible?: boolean;
}

export const SidebarWithPlayer = observer((props: SidebarWithPlayerProps) => {
    const { className, episodes, currentEpisode, onEpisodeSelect, isVisible = true } = props;
    const { t } = useTranslation("animeDetailsVideoPage");
    const sidebarRef = useRef<HTMLMenuElement>(null);
    
    useEffect(() => {
        if (isVisible && sidebarRef.current) {
            sidebarRef.current.focus();
        }
    }, [isVisible]);
    
    const menuItems: MenuProps['items'] = episodes.map((episode) => ({
        key: episode.sort_order.toString(),
        label: (
            <div onClick={() => onEpisodeSelect?.(episode)}>
                <div className={s.episodeTitle}>
                    {t('Эпизод')} {episode?.sort_order}
                </div>
            </div>
        ),
    }));

    return (
        <menu 
            ref={sidebarRef}
            className={classNames(
                s.SidebarWithPlayer, 
                { [s.visible]: isVisible },
                [className]
            )}
            tabIndex={-1}
        >
            <Title level={5} className={s.title}>{t('Эпизоды')}</Title>
            <Menu
                mode="inline"
                selectedKeys={currentEpisode ? [currentEpisode.toString()] : []}
                className={s.menu}
                items={menuItems}
            />
        </menu>
    )
})