import { observer } from "mobx-react-lite";
import classNames from "shared/library/classNames/classNames";
import s from "./AnimeDetailsVideoPage.module.scss";
import { Page } from "widgets/Page/Page";
import { useEffect } from "react";
import Player from "shared/ui/Player/Player";
import { useAnimeEpisode } from "pages/AnimeDetailsPage/lib/useAnimeEpisode";
import { useStore } from "app/providers/StoreProvider";

interface AnimeDetailsVideoPageProps {
  className?: string;
}


export const AnimeDetailsVideoPage = observer(({ className }: AnimeDetailsVideoPageProps) => {
  const { id, episode } = useAnimeEpisode();
  const { releasesStoreDetailsAnime } = useStore();

  useEffect(() => {
    if (id) {
      releasesStoreDetailsAnime.getReleasesDetailsAnimeAction(Number(id));
      console.log(releasesStoreDetailsAnime.releasesData);
    }
  }, [id, releasesStoreDetailsAnime]);

  return (
    <Page className={classNames(s.AnimeDetailsVideoPage, {}, [className])}>
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