import classNames from "shared/library/classNames/classNames";
import { observer } from "mobx-react-lite"
import s from './FranchisesList.module.scss'
import { FranchisesItem } from "../FranchisesItem/FranchisesItem";

import { FranchisesListItemSkeleton } from "./FranchisesListItemSkeleton";
import { Flex } from "antd";
import { FranchisesResponse } from "shared/api/services/franchises-anime/types";

interface FranchisesListProps {
    className?: string;
    franchises: FranchisesResponse;
    isLoading: boolean;
    isLandingPage?: boolean;
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
        isLandingPage = false
    } = props;

    return (
        <section className={classNames(s.FranchisesList, {}, [className])}>
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
        </section>
    );
});

export default FranchisesList;
