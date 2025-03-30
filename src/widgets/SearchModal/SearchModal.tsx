import { Card, Flex, Input, Modal } from "antd"
import { useEffect, useState, useCallback } from "react"
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import s from './SearchModal.module.scss'
import classNames from "shared/library/classNames/classNames";
import { Portal } from "shared/ui/Portal/Portal";
import { useStore } from "app/providers/StoreProvider";
import { ArticleList, ArticleView } from "entities/Article";
import { observer } from "mobx-react-lite";
import { FranchisesList } from "entities/Franchise";
import { SearchAnimeResponse } from "shared/api/services/search-anime/types";
import { Anime } from "shared/api/services/releases-anime-catalog/types";
interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    className?: string;
}

export const SearchModal = observer((props: SearchModalProps) => {
    const {
        className,
        isOpen,
        onClose
    } = props
    const [query, setQuery] = useState('')
    const { t } = useTranslation();
    const { searchAnimeStore } = useStore();

    const handleSearch = useCallback(() => {
        if (query.trim()) {
            searchAnimeStore.getSearchAnimeAction(query);
        }
    }, [query, searchAnimeStore]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    useEffect(() => {
        const debounceSearch = setTimeout(() => {
            if (query.trim()) {
                handleSearch();
            }
        }, 300);

        return () => clearTimeout(debounceSearch);
    }, [query, handleSearch]);

    return (
        <Portal>
            <Modal
                open={isOpen}
                onCancel={onClose}
                footer={null}
                keyboard={true}
                closable={true}
                className={classNames(s.modal, {}, [className])}
                width={1200}
            >
                <Flex align="center" className={s.card}>
                    <Input
                        placeholder={t('Введите название аниме')}
                        onChange={e => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        value={query}
                        autoFocus
                        size="large"
                    />
                    <Search
                        size={24}
                        onClick={handleSearch}
                    />
                </Flex>
                <div className={s.scrollContainer}>
                    <ArticleList
                        genres={false}
                        articles={searchAnimeStore.searchData?.value as Anime[]}
                        isLoading={searchAnimeStore.searchData?.state === 'pending'}
                        className={s.articleList}
                        view={ArticleView.BIG}
                    />
                </div>
            </Modal>
        </Portal>
    )
})