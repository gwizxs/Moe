import classNames from 'shared/library/classNames/classNames';
import {
    MutableRefObject, ReactNode, useRef,
} from 'react';
import s from './Page.module.scss';
import { useInfiniteScroll } from 'shared/library/hooks/useInfiniteScroll';

interface PageProps {
    className?: string
    children?: ReactNode;
    onScrollEnd?: () => void
}

export const PAGE_ID = 'PAGE_ID';

export const Page = (props: PageProps) => {
    const { className, children, onScrollEnd } = props;
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    });

    return (
        <main
            ref={wrapperRef}
            className={classNames(s.Page, {}, [className])}
            id={PAGE_ID}
        >
            {children}
            {onScrollEnd ? <div className={s.trigger} ref={triggerRef} /> : null}
        </main>
    );
};
