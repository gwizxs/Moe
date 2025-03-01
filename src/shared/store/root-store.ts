import { ArticlesViewStore } from "./ArticleView/ArticleViewStore";
import { SidebarStore } from "./Sidebar/SidebarStore";

export class RootStore {
    articlesViewStore = new ArticlesViewStore();
    sidebarStore = new SidebarStore();
}
