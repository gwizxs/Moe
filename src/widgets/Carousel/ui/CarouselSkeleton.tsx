import { Card, Skeleton } from 'antd';
import s from './Carousel.module.scss';

export const CarouselSkeleton = () => {
    return (
        <div className={s.bannerContainer}>
            <Card className={s.banner}>
                <div className={s.bannerItem}>
                    <Skeleton.Image 
                        active
                        className={s.skeletonImage}
                    />
                </div>
            </Card>
        </div>
    );
};