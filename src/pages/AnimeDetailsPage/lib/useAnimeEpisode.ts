import { useStore } from "app/providers/StoreProvider";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export const useAnimeEpisode = () => {
  const { releasesStoreDetailsAnime } = useStore();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const hash = searchParams.get("hash");

  const episode = useMemo(() => {
    return releasesStoreDetailsAnime.getEpisodeByHash(hash);
  }, [hash, releasesStoreDetailsAnime]);

  return { id, episode };
};
