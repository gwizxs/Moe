import { ArticlesViewStore } from "./ArticleView/ArticleViewStore";
import { LoginStore } from "./Auth/LoginStore/LoginStore";
import { SidebarStore } from "./Sidebar/SidebarStore";

export class RootStore {
    articlesViewStore = new ArticlesViewStore();
    loginStore = new LoginStore();
    sidebarStore = new SidebarStore();
}
