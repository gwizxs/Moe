import classNames from 'classnames';
import s from './PageLoader.module.scss';

interface PageLoaderProps {
    className?: string;
}

export const PageLoader = (props: PageLoaderProps) => {
    const {
        className,
    } = props;

    return (
        <div className={classNames(s.PageLoader, {}, [className])}>
            <span className={s.loader}></span>
        </div>
    );
}