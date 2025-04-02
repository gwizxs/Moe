import classNames from "shared/library/classNames/classNames";
import { observer } from "mobx-react-lite";
import s from './FranchisesList.module.scss';
import { FranchisesItem } from "../FranchisesItem/FranchisesItem";
import { FranchisesListItemSkeleton } from "./FranchisesListItemSkeleton";
import { Flex } from "antd";
import { FranchisesResponse } from "shared/api/services/franchises-anime/types";
import VirtualList from "rc-virtual-list";
import { useTranslation } from "react-i18next";
import { isMobile, isDesktop } from 'react-device-detect';
import { useEffect, useRef, useState, useMemo, useCallback } from "react";

interface FranchisesListProps {
    className?: string;
    franchises: FranchisesResponse;
    isLoading: boolean;
    isLandingPage?: boolean;
    onScrollEnd?: () => void;
}

const getSkeletons = (isLandingPage: boolean) => new Array(isLandingPage ? 4 : 12)
    .fill(0)
    .map((_, index) => (
        <FranchisesListItemSkeleton className={s.card} key={index} />
    ));

export const FranchisesList = observer((props: FranchisesListProps) => {
    const {
        className,
        franchises,
        isLoading,
        isLandingPage = false,
        onScrollEnd
    } = props;
    const { t } = useTranslation();
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerHeight, setContainerHeight] = useState(800);
    const [itemsPerRow, setItemsPerRow] = useState(isMobile ? 1 : isDesktop ? 3 : 2); 

    const CARD_WIDTH = 560;
    const ITEM_HEIGHT = 320;

    const updateDimensions = () => {
        if (containerRef.current) {
            const windowHeight = window.innerHeight;
            const containerTop = containerRef.current.getBoundingClientRect().top;
            const availableHeight = windowHeight - containerTop - 40;
            setContainerHeight(Math.max(600, availableHeight));

            const containerWidth = containerRef.current.clientWidth;
            const gap = 16;
            const calculatedItemsPerRow = Math.floor((containerWidth + gap) / (CARD_WIDTH + gap));
            setItemsPerRow(isMobile ? 1 : Math.min(3, Math.max(2, calculatedItemsPerRow)));
        }
    };

    useEffect(() => {
        if (!isLandingPage) {
            updateDimensions();
            window.addEventListener('resize', updateDimensions);
        }
        return () => window.removeEventListener('resize', updateDimensions);
    }, [isLandingPage]);

    const rows = useMemo(() => {
        if (!franchises?.length) return [];

        const result = [];
        for (let i = 0; i < franchises.length; i += itemsPerRow) {
            const rowItems = franchises.slice(i, i + itemsPerRow);
            result.push(rowItems);
        }
        return result;
    }, [franchises, itemsPerRow]);

    const getRowKey = (row: FranchisesResponse) => {
        return row.map(item => item.id).join('-');
    };

    const onScroll = useCallback((e: React.UIEvent<HTMLElement, UIEvent>) => {
        if (!onScrollEnd) return;

        const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
        const bottom = scrollHeight - scrollTop - clientHeight < 200;

        if (bottom) {
            onScrollEnd();
        }
    }, [onScrollEnd]);

    const renderList = () => (
        <Flex wrap justify="center" align="center" gap={16}>
            {franchises?.map((franchise) => (
                <FranchisesItem
                    franchise={franchise}
                    key={franchise.id}
                    className={s.card}
                />
            ))}
            {isLoading && getSkeletons(isLandingPage ?? false)}
        </Flex>
    );

    if (!isLoading && (!franchises || !franchises.length)) {
        return (
            <div className={classNames(s.emptyState, {}, [className])}>
                {t('Ничего не найдено')}
            </div>
        );
    }

    return (
        <section className={classNames(s.FranchisesList, {}, [className])} ref={containerRef}>
            {franchises && franchises.length > 0 && (
                isLandingPage
                    ? renderList()
                    : (
                        <section className={s.listWrapper}>
                            <VirtualList
                                data={rows}
                                height={containerHeight}
                                itemHeight={ITEM_HEIGHT}
                                itemKey={getRowKey}
                                className={s.virtualList}
                                onScroll={onScroll}
                                showScrollBar
                            >
                                {(row: FranchisesResponse) => (
                                    <div className={s.row}>
                                        {row.map(franchise => (
                                            <FranchisesItem
                                                franchise={franchise}
                                                key={franchise.id}
                                                className={s.card}
                                            />
                                        ))}
                                    </div>
                                )}
                            </VirtualList>
                        </section>
                    )
            )}
            {isLoading && renderList()}
        </section>
    );
});

export default FranchisesList;
