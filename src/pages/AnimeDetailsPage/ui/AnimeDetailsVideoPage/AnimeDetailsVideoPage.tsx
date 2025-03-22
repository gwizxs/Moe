import { observer } from "mobx-react-lite";
import classNames from "shared/library/classNames/classNames";
import s from "./AnimeDetailsVideoPage.module.scss";
import { Page } from "widgets/Page/Page";
import { useEffect, useMemo } from "react";
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

  const id = searchParams.get("id");
  const sortOrder = Number(searchParams.get("sort_order"));

  useEffect(() => {
    if (id && !isNaN(Number(id))) {
      releasesStoreDetailsAnime.getReleasesDetailsAnimeAction(Number(id));
    }
  }, [id, releasesStoreDetailsAnime]);


  const episodes = useMemo(() => {
    if (!releasesStoreDetailsAnime.releasesData || releasesStoreDetailsAnime.releasesData.state !== "fulfilled") {
      return [];
    }
    return releasesStoreDetailsAnime.releasesData.value?.data?.episodes || [];
  }, [releasesStoreDetailsAnime.releasesData]);
  

  const episode = useMemo(() => {
    return episodes.find((ep: Episode) => ep.sort_order === Number(sortOrder));
}, [episodes, sortOrder]);


  return (
    <Page className={classNames(s.AnimeDetailsVideoPage, {}, [className])}>
      {releasesStoreDetailsAnime.releasesData?.state === "pending" && <p>Загрузка...</p>}
      {releasesStoreDetailsAnime.releasesData?.state === "rejected" && <p>Ошибка загрузки</p>}
      {episode ? (
        <Player
          url={episode.hls_1080}
          opening={episode.opening}
          ending={episode.ending}
        />
      ) : (
        <p>Эпизод не найден</p>
      )}
    </Page>
  );
});

export default AnimeDetailsVideoPage;