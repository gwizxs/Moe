import { observer } from "mobx-react-lite";
import classNames from "shared/library/classNames/classNames";
import s from "./AnimeDetailsVideoPage.module.scss";
import { Page } from "widgets/Page/Page";
import { useEffect, useState } from "react";
import Player from "shared/ui/Player/Player";
import { useStore } from "app/providers/StoreProvider";
import { useSearchParams } from "react-router-dom";
import { Episode } from "shared/api/services/releases-anime-details/types";
import { PageLoader } from "widgets/PageLoader/ui/PageLoader";
import { Typography } from "antd";
interface AnimeDetailsVideoPageProps {
  className?: string;
}

const { Title } = Typography;

export const AnimeDetailsVideoPage = observer(({ className }: AnimeDetailsVideoPageProps) => {
  const { releasesStoreDetailsAnime } = useStore();
  const [searchParams] = useSearchParams();
  const [episode, setEpisode] = useState<Episode | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const id = searchParams.get("id");
  const sortOrderParam = searchParams.get("sort_order");
  
  const sortOrder = (() => {
    const parsedOrder = Number(sortOrderParam);
    if (isNaN(parsedOrder) || parsedOrder <= 0) {
      return 1;
    }
    return parsedOrder;
  })();

  useEffect(() => {
    const loadAnimeAndEpisode = async () => {
      if (id && !isNaN(Number(id))) {
        setIsLoading(true);
        
        await releasesStoreDetailsAnime.getReleasesDetailsAnimeAction(Number(id));
        
        const foundEpisode = await releasesStoreDetailsAnime.getEpisodeWhenReady(sortOrder);
        setEpisode(foundEpisode);
        setIsLoading(false);
      } else {
        console.error("Invalid anime ID:", id);
      }
    };
    
    loadAnimeAndEpisode();
  }, [id, sortOrder, releasesStoreDetailsAnime]);

  const getPreviewUrl = () => {
    if (!episode || !episode.preview) return undefined;
    
    if (episode.preview.optimized && episode.preview.optimized.src) {
      return episode.preview.optimized.src;
    }
    
    return episode.preview.src;
  };

  return (
    <Page className={classNames(s.AnimeDetailsVideoPage, {}, [className])}>
      {isLoading && <PageLoader />}
      {releasesStoreDetailsAnime.releasesData?.state === "rejected" && (
        <Title className={s.error} level={3}>Ошибка загрузки: {releasesStoreDetailsAnime.error || 'Неизвестная ошибка'}</Title>
      )}
      {!isLoading && episode && episode.hls_1080 ? (
        <Player
          url={episode.hls_1080}
          opening={episode.opening}
          ending={episode.ending}
          preview={getPreviewUrl()}
        />
      ) : !isLoading && (
        <div className={s.error}>
          <Title level={3}>Эпизод не найден или видео недоступно</Title>
          {releasesStoreDetailsAnime.episodes.length > 0 && (
            <Title level={5}>Доступно эпизодов: {releasesStoreDetailsAnime.episodes.length}, текущий: {sortOrder}</Title>
          )}
        </div>
      )}
    </Page>
  );
});

export default AnimeDetailsVideoPage;