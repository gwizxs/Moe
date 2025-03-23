import { TvMinimalPlay } from "lucide-react";
import ReactPlayer from "react-player";
import { useRef, useState } from "react";
import classNames from "classnames";
import s from "./Player.module.scss";
import { Button, Typography } from "antd";
import { useTranslation } from "react-i18next";

interface PlayerProps {
    url: string;
    className?: string;
    opening?: { start: number; stop: number };
    ending?: { start: number; stop: number };
    preview?: { src: string; thumbnail: string; } | string;
}

const { Title } = Typography;

export const Player = (props: PlayerProps) => {
    const  {
        url,
        className,
        opening,
        ending,
        preview
    } = props
    const playerRef = useRef<ReactPlayer | null>(null);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const { t } = useTranslation();

    const previewUrl = preview ? (typeof preview === 'object' ? preview.src : preview) : undefined;

    const handleProgress = (state: { playedSeconds: number }) => {
        setCurrentTime(state.playedSeconds);
    };

    return (
        <section className={classNames(s.Player, {}, [className])}>
            {url ? (
                <>
                    <ReactPlayer
                        ref={playerRef}
                        light={previewUrl}
                        url={url}
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
                </>
            ) : (
                <Title className={s.errorTitle} level={5}>URL отсутствует или некорректный</Title>
            )}
        </section>
    );
};

export default Player;
