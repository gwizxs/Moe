import { TvMinimalPlay } from "lucide-react";
import ReactPlayer from "react-player";
import { useRef, useState, useEffect } from "react";
import classNames from "classnames";
import s from "./Player.module.scss";
import { Button, Select, Typography } from "antd";
import { useTranslation } from "react-i18next";
import loaderFrame from "shared/assets/bg/loaderFrame.webp";

type Preview = { src: string; thumbnail: string; } | string;
type Opening = { start: number; stop: number };
type Ending = { start: number; stop: number };

interface PlayerProps {
    url: string;
    url720?: string;
    url480?: string;
    className?: string;
    opening?: Opening;
    ending?: Ending;
    preview?: Preview;
}

const { Title } = Typography;

export const Player = (props: PlayerProps) => {
    const {
        url, 
        url720,
        url480,
        className,
        opening,
        ending,
        preview
    } = props;
    
    const playerRef = useRef<ReactPlayer | null>(null);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [quality, setQuality] = useState<string>('480');
    const [currentUrl, setCurrentUrl] = useState<string>(url);
    const { t } = useTranslation();

    const previewUrl = preview ? (typeof preview === 'object' ? preview.src : preview) : loaderFrame;

    useEffect(() => {
        setCurrentUrl(url);
        setQuality('480');
    }, [url]);

    useEffect(() => {
        let newUrl = url;
        
        if (quality === '720' && url720) {
            newUrl = url720;
        } else if (quality === '480' && url480) {
            newUrl = url480;
        }
        
        const currentPosition = currentTime;
        setCurrentUrl(newUrl);

        setTimeout(() => {
            playerRef.current?.seekTo(currentPosition, "seconds");
        }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quality, url, url720, url480]);

    const handleProgress = (state: { playedSeconds: number }) => {
        setCurrentTime(state.playedSeconds);
    };

    const handleQualityChange = (value: string) => {
        setQuality(value);
    };

    const qualityOptions = [
        { value: '1080', label: '1080p', disabled: !url },
        { value: '720', label: '720p', disabled: !url720 },
        { value: '480', label: '480p', disabled: !url480 },
    ];

    return (
        <section className={classNames(s.Player, {}, [className])}>
            {currentUrl ? (
                <>
                    <ReactPlayer
                        ref={playerRef}
                        light={previewUrl}
                        url={currentUrl}
                        width="100%"
                        height="100%"
                        playIcon={<TvMinimalPlay size={60} />}
                        controls
                        playing
                        onProgress={handleProgress}
                        onError={(e) => console.error("ReactPlayer error:", e)}
                        previewTabIndex={1}
                    />
                    <div className={s.controls}>
                        {opening && currentTime >= opening.start && currentTime < opening.stop && (
                            <Button
                                size="large"
                                className={s.skipButton}
                                onClick={() => playerRef.current?.seekTo(opening.stop, "seconds")}
                            >
                                {t("Пропустить опенинг")}
                            </Button>
                        )}
                        {ending && currentTime >= ending.start && currentTime < ending.stop && (
                            <Button
                                size="large"
                                className={s.skipButton}
                                onClick={() => playerRef.current?.seekTo(ending.stop, "seconds")}
                            >
                                {t("Пропустить эндинг")}
                            </Button>
                        )}
                    </div>
                    <div className={s.quality}>
                        <Select
                            value={quality}
                            onChange={handleQualityChange}
                            options={qualityOptions}
                            className={s.qualitySelect}
                            popupMatchSelectWidth={false}
                        />
                    </div>
                </>
            ) : (
                <Title className={s.errorTitle} level={5}>{t('URL отсутствует или некорректный')}</Title>
            )}
        </section>
    );
};

export default Player;
