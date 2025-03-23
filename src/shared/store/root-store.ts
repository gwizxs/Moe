import { ReleasesStoreAnime } from "./api/releases-store-anime/releases-store-anime";
import { ArticlesViewStore } from "./ArticleView/ArticleViewStore";
import { SidebarStore } from "./Sidebar/SidebarStore";
import { ReleasesStoreDetailsAnime } from "./api/releases-store-anime/releases-store-details-anime";
import { ReleasesStoreAnimeInfo } from "./api/releases-store-anime/releases-store-anime-info";

export class RootStore {
    articlesViewStore = new ArticlesViewStore();
    sidebarStore = new SidebarStore();
    releasesStoreAnime = new ReleasesStoreAnime();
    releasesStoreDetailsAnime = new ReleasesStoreDetailsAnime();
    releasesStoreAnimeInfo = new ReleasesStoreAnimeInfo();
}
