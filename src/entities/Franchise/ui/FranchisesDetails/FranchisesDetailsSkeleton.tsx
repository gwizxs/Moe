import { Skeleton } from "antd";
import classNames from "shared/library/classNames/classNames";
import s from '../FranchisesDetails/FranchisesDetails.module.scss';

interface FranchisesDetailsSkeletonProps {
    className?: string;
}

export const FranchisesDetailsSkeleton = (props: FranchisesDetailsSkeletonProps) => {
    const { className } = props;

    return (
        <div className={classNames(s.FranchisesDetails, {}, [className, s.loading])}>
            <div className={s.franchiseInfo}>
                <Skeleton.Image active className={s.poster} />
                <div className={s.mainInfo}>
                    <Skeleton.Input active size="large" className={s.title} />
                    <Skeleton.Input active size="default" className={s.subtitleSkeleton} />
                    <div className={s.statsSkeleton}>
                        <Skeleton.Input active size="small" className={s.statSmall} />
                        <Skeleton.Input active size="small" className={s.statMedium} />
                        <Skeleton.Input active size="small" className={s.statLarge} />
                    </div>
                </div>
            </div>
            <Skeleton.Input active size="large" className={s.sectionTitleSkeleton} />
            {[1, 2].map((item) => (
                <div key={`skeleton-franchise-${item}`} className={s.releaseItem}>

                    <div className={s.releaseCard}>
                        <Skeleton.Image active className={s.releasePoster} />
                        <div className={s.releaseInfo}>
                            <Skeleton.Input active size="small" className={s.releaseTitleSkeleton} />
                            <Skeleton.Input active size="small" className={s.releaseSubtitleSkeleton} />
                            <div className={s.releaseDetailsSkeleton}>
                                <Skeleton.Input active size="small" className={s.releaseDetailsFull} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FranchisesDetailsSkeleton; 