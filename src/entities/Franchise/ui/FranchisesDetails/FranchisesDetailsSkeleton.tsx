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
                    <Skeleton.Input active size="default" className={s.subtitle} style={{ width: '80%', marginTop: '0.5rem' }} />
                    <div className={s.stats} style={{ marginTop: 'auto' }}>
                        <Skeleton.Input active size="small" style={{ width: '30%' }} />
                        <Skeleton.Input active size="small" style={{ width: '60%' }} />
                        <Skeleton.Input active size="small" style={{ width: '40%' }} />
                    </div>
                </div>
            </div>
            <Skeleton.Input active size="large" style={{ width: '30%' }} />
            {[1, 2].map((item) => (
                <div key={`skeleton-franchise-${item}`} className={s.releaseItem}>
                    <div className={s.releaseNumber}>#{item}</div>
                    <div className={s.releaseCard}>
                        <Skeleton.Image active className={s.releasePoster} />
                        <div className={s.releaseInfo}>
                            <Skeleton.Input active size="small" style={{ width: '80%' }} />
                            <Skeleton.Input active size="small" style={{ width: '60%', marginTop: '0.5rem' }} />
                            <div className={s.releaseDetails} style={{ marginTop: 'auto' }}>
                                <Skeleton.Input active size="small" style={{ width: '90%' }} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FranchisesDetailsSkeleton; 