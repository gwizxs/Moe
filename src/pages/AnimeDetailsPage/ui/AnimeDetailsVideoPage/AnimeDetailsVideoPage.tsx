import { observer } from "mobx-react-lite";
import classNames from "shared/library/classNames/classNames";
import s from "./AnimeDetailsVideoPage.module.scss";
import { Page } from "widgets/Page/Page";
import { useEffect, useState } from "react";
import Player from "shared/ui/Player/Player";
import { useStore } from "app/providers/StoreProvider";
import { useSearchParams } from "react-router-dom";
import { Episode } from "shared/api/services/releases-anime-details/types";

interface AnimeDetailsVideoPageProps {
  className?: string;
}

export const AnimeDetailsVideoPage = observer(({ className }: AnimeDetailsVideoPageProps) => {
  const { releasesStoreDetailsAnime } = useStore();
  const [searchParams] = useSearchParams();
  const [episode, setEpisode] = useState<Episode | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const id = searchParams.get("id");
  const sortOrderParam = searchParams.get("sort_order");
  
  const sortOrder = (() => {
    const parsedOrder = Number(sortOrderParam);
    console.log("Sort order from URL:", sortOrderParam, "Parsed:", parsedOrder);
    
    if (isNaN(parsedOrder) || parsedOrder <= 0) {
      console.log("Using default sort order 1");
      return 1;
    }
    return parsedOrder;
  })();

  useEffect(() => {
    const loadAnimeAndEpisode = async () => {
      if (id && !isNaN(Number(id))) {
        console.log("Loading anime with ID:", id);
        setIsLoading(true);
        
        await releasesStoreDetailsAnime.getReleasesDetailsAnimeAction(Number(id));
        
        const foundEpisode = await releasesStoreDetailsAnime.getEpisodeWhenReady(sortOrder);
        console.log("Episode after waiting:", foundEpisode);
        setEpisode(foundEpisode);
        setIsLoading(false);
      } else {
        console.error("Invalid anime ID:", id);
      }
    };
    
    loadAnimeAndEpisode();
  }, [id, sortOrder, releasesStoreDetailsAnime]);

  useEffect(() => {
    console.log("Current episodes available:", releasesStoreDetailsAnime.episodes.length);
  }, [releasesStoreDetailsAnime.episodes]);

  return (
    <Page className={classNames(s.AnimeDetailsVideoPage, {}, [className])}>
      {isLoading && <p>Загрузка...</p>}
      {releasesStoreDetailsAnime.releasesData?.state === "rejected" && (
        <p>Ошибка загрузки: {releasesStoreDetailsAnime.error || 'Неизвестная ошибка'}</p>
      )}
      {!isLoading && episode && episode.hls_1080 ? (
        <Player
          url={episode.hls_1080}
          opening={episode.opening}
          ending={episode.ending}
          preview={episode.preview.optimized.src}
        />
      ) : !isLoading && (
        <div>
          <p>Эпизод не найден или видео недоступно</p>
          {releasesStoreDetailsAnime.episodes.length > 0 && (
            <p>Доступно эпизодов: {releasesStoreDetailsAnime.episodes.length}, текущий sort_order: {sortOrder}</p>
          )}
        </div>
      )}
    </Page>
  );
});

export default AnimeDetailsVideoPage;