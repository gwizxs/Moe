import { makeAutoObservable } from "mobx";
import { ArticleView } from "entities/Article"; 

export class ArticlesViewStore {
    view: ArticleView = ArticleView.SMALL;

    constructor() {
        makeAutoObservable(this, {}, {autoBind:true});
        this.loadViewFromLocalStorage();
    }

    setView(newView: ArticleView) {
        this.view = newView;
        this.saveViewToLocalStorage();
    }

    private saveViewToLocalStorage() {
        localStorage.setItem("articleView", this.view);
    }

    private loadViewFromLocalStorage() {
        const savedView = localStorage.getItem("articleView") as ArticleView;
        if (savedView && Object.values(ArticleView).includes(savedView)) {
            this.view = savedView;
        }
    }
}
