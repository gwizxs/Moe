import { observer } from "mobx-react-lite";
import classNames from "shared/library/classNames/classNames";
import s from './Franchises.module.scss'
import { Page } from "widgets/Page/Page";
import { FranchisesList } from "entities/Franchise";
import { useStore } from "app/providers/StoreProvider";
import { useEffect, useMemo, useState } from "react";
import { FranchisesResponse } from "shared/api/services/franchises-anime/types";
import { FranchisesPageHeader } from "../FranchisesPageHeader/FranchisesPageHeader";
import { isDesktop } from "react-device-detect";
import { useDebounce } from "shared/hooks/useDebounce";

interface FranchisesPageProps {
    className?: string;
}

export const FranchisesPage = observer(({ className }: FranchisesPageProps) => {
    const { franchisesStoreAnime } = useStore();
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearchQuery = useDebounce(searchQuery, 300);
    const [filteredFranchises, setFilteredFranchises] = useState<FranchisesResponse | null>(null);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    useEffect(() => {
        const fetchData = async () => {
            await franchisesStoreAnime.getAllFranchisesAnimeAction();
        };
        fetchData();
    }, [franchisesStoreAnime]);

    useEffect(() => {
        const franchisesData = franchisesStoreAnime.franchisesDataAll?.value as FranchisesResponse;
        
        if (!franchisesData) {
            setFilteredFranchises(null);
            setIsSearching(false);
            return;
        }

        if (!debouncedSearchQuery.trim()) {
            setFilteredFranchises(franchisesData);
            setIsSearching(false);
            return;
        }

        const query = debouncedSearchQuery.toLowerCase().trim();
        const filtered = franchisesData.filter((franchise) => 
            franchise.name.toLowerCase().includes(query) || 
            (franchise.name_english && franchise.name_english.toLowerCase().includes(query))
        );
        
        setFilteredFranchises(filtered);
        setIsSearching(false);
    }, [debouncedSearchQuery, franchisesStoreAnime.franchisesDataAll?.value]);

    const isLoading = franchisesStoreAnime.franchisesDataAll?.state === "pending" || isSearching;
    const franchisesToDisplay = useMemo(() => filteredFranchises || [], [filteredFranchises]);

    return (
        <Page className={classNames(s.FranchisesPage, {}, [className])}>
            {isDesktop && <FranchisesPageHeader onSearch={handleSearch} />}
            <FranchisesList 
                franchises={franchisesToDisplay}
                isLoading={isLoading}
            />
        </Page>
    );
});

export default FranchisesPage;

