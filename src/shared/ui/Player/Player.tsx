import { TvMinimalPlay } from "lucide-react";
import ReactPlayer from "react-player";
import { useRef, useState } from "react";
import classNames from "classnames";
import s from "./Player.module.scss";
import { Button } from "antd";
import { useTranslation } from "react-i18next";

interface PlayerProps {
    url: string;
    className?: string;
    opening?: { start: number; stop: number };
    ending?: { start: number; stop: number };
}

export const Player = ({ url, className, opening, ending }: PlayerProps) => {
    const playerRef = useRef<ReactPlayer | null>(null);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const { t } = useTranslation()

    const handleProgress = (state: { playedSeconds: number }) => {
        setCurrentTime(state.playedSeconds);
    };

    return (
        <section className={classNames(s.Player, {}, [className])}>
            <ReactPlayer
                ref={playerRef}
                light
                url={url}
                width="100%"
                height="100%"
                playIcon={<TvMinimalPlay size={60} />}
                controls
                playing
                onProgress={handleProgress}
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
                        onClick={() => playerRef.current?.seekTo(ending.start, "seconds")}
                    >
                        {t("Пропустить эндинг")}
                    </Button>
                )}
            </div>
        </section>
    );
};

export default Player;
