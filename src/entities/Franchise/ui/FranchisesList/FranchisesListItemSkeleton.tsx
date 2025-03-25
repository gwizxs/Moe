import { Card, Skeleton } from 'antd'
import s from './FranchisesList.module.scss'
import classNames from 'shared/library/classNames/classNames';

interface FranchisesListItemSkeletonProps {
    className?: string;
}

export const FranchisesListItemSkeleton = (props: FranchisesListItemSkeletonProps) => {
    const { className } = props;

    return (
        <Card className={classNames(s.FranchisesItem, {}, [className])}>
            <div style={{display: 'flex', gap: '1rem'}}>
                <Skeleton.Image 
                    active
                    style={{
                        width: '12rem',
                        height: '16rem'
                    }}
                />
                <div style={{flex: 1}}>
                    <Skeleton.Input active block style={{marginBottom: '1rem'}}/>
                    <Skeleton.Input active block style={{width: '70%'}}/>
                </div>
            </div>
        </Card>
    )
}
