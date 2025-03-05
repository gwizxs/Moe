import { ReleasesStoreAnime } from "./api/releases-store-anime/releases-store-anime";
import { ArticlesViewStore } from "./ArticleView/ArticleViewStore";
import { SidebarStore } from "./Sidebar/SidebarStore";

export class RootStore {
    articlesViewStore = new ArticlesViewStore();
    sidebarStore = new SidebarStore();
    releasesStoreAnime = new ReleasesStoreAnime();
}
