import classNames from "shared/library/classNames/classNames";
import { observer } from "mobx-react-lite"
import s from './FranchisesList.module.scss'
import { FranchisesItem } from "../FranchisesItem/FranchisesItem";
import { RandomFranchisesResponse } from "shared/api/services/franchises-anime/random-franchises/types";
import { FranchisesListItemSkeleton } from "./FranchisesListItemSkeleton";
import { Flex } from "antd";

interface FranchisesListProps {
    className?: string;
    franchises: RandomFranchisesResponse;
    isLoading: boolean;
}

const getSkeletons = () => new Array(4)
    .fill(0)
    .map((_, index) => (
        <FranchisesListItemSkeleton className={s.card} key={index} />
    ));

export const FranchisesList = observer((props: FranchisesListProps) => {
    const {
        className,
        franchises,
        isLoading
    } = props;

    return (
        <section className={classNames(s.FranchisesList, {}, [className])}>
            <Flex wrap gap={16}>
                {franchises?.map((franchise) => (
                    <FranchisesItem
                        franchise={franchise}
                        key={franchise.id}
                        className={s.card}
                    />
                ))}
                {isLoading && getSkeletons()}
            </Flex>
        </section>
    );
});

export default FranchisesList;
