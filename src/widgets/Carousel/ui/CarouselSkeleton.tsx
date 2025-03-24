import { Skeleton } from 'antd';
import s from './Carousel.module.scss';

export const CarouselSkeleton = () => {
    return (
        <div className={s.bannerContainer}>
            <div className={s.banner}>
                <div className={s.bannerItem}>
                    <div className={s.bannerOverlay} />
                    <Skeleton.Image 
                        active
                        className={s.skeletonImage}
                    />
                </div>
            </div>
        </div>
    );
};