
export enum ArticleStatus {
    VACANCIES = 'vacancies',
    NO_VACANCIES = 'no_vacancies'
}

export enum ArticleView {
    BIG = 'BIG',
    SMALL = 'SMALL'
}



export interface Article {
    id: string; 
    title: string; 
    subtitle: string;
    description: string; 
    status: ArticleStatus; 
    icon: string;
    createdAt: string;
  };