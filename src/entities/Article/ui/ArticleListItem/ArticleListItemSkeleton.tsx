import classNames from 'shared/library/classNames/classNames';
import { memo } from 'react';
import s from './ArticleListItem.module.scss';
import { ArticleView } from '../../model/article';
import { Skeleton, Card } from 'antd';


interface ArticleListItemSkeletonProps {
    className?: string;
    view: ArticleView;
}

export const ArticleListItemSkeleton = memo((props: ArticleListItemSkeletonProps) => {
    const { className, view } = props;

    if (view === ArticleView.BIG) {
        return (
            <div className={classNames(s.ArticleListItem, {}, [className, s[view]])}>
                <Card className={s.bigCard}>
                    <div className={s.ImgCardContentS}>
                        <Skeleton.Image className={s.img} active />
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className={classNames(s.ArticleListItem, {}, [className, s[view]])}>
            <Card className={s.card}>
                <div className={s.img}>
                    <Skeleton.Image active />
                </div>
            </Card>
        </div>
    );
});
