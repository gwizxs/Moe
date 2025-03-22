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
                <Card className={s.card}>
                    <div className={s.header}>
                        <Skeleton.Avatar active size="large" shape="circle" />
                    </div>
                    <Skeleton.Image active style={{ height: 200 }} className={s.img} />
                </Card>
            </div>
        );
    }

    return (
        <div className={classNames(s.ArticleListItem, {}, [className, s[view]])}>
            <Card className={s.card}>
                <div className={s.imageWrapper}>
                    <Skeleton.Image active style={{ width: 200, height: 200 }} className={s.img} />
                </div>
                <Skeleton.Input active size="small" style={{ width: 150 }} className={s.title} />
            </Card>
        </div>
    );
});
