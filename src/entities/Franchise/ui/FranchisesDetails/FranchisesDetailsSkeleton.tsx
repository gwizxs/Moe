

import { Card, Skeleton } from "antd";
import classNames from "shared/library/classNames/classNames";
import s from './FranchisesDetails.module.scss';

interface FranchisesDetailsSkeletonProps {
    className?: string;
}

export const FranchisesDetailsSkeleton = (props: FranchisesDetailsSkeletonProps) => {
    const { className } = props;

    return (
        <Card className={classNames(s.FranchisesDetails, {}, [className, s.loading])}>
            <div className={s.franchiseInfo}>
                <Skeleton.Image active className={s.poster} />
                <div className={s.mainInfo}>
                    <Skeleton active paragraph={{ rows: 4 }} />
                </div>
            </div>
            <Skeleton active paragraph={{ rows: 6 }} />
        </Card>
    );
};
