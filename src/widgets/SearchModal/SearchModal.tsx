import { Input, Modal } from "antd"
import { useState } from "react"
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import s from './SearchModal.module.scss'
import classNames from "shared/library/classNames/classNames";
import { Portal } from "shared/ui/Portal/Portal";
interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    className?: string;
}

export const SearchModal = (props: SearchModalProps) => {
    const {
        className,
        isOpen,
        onClose
    } = props
    const [query, setQuery] = useState('')
    const { t } = useTranslation();

    const handleSearch = () => {
        if (query.trim()) {
            console.log('Поиск по запросу:', query);
            // TODO: реализовать поиск по запросу
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <Portal>
            <Modal
                open={isOpen}
                onCancel={onClose}
                footer={null}
                centered
                keyboard={true}
                closable={true}
                title={t('Поиск')}
                className={classNames(s.modal, {}, [className])}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Input
                        placeholder={t('Введите название аниме')}
                        onChange={e => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        value={query}
                        autoFocus
                        size="large"
                        style={{ marginRight: '12px' }}
                    />
                    <Search
                        size={24}
                        style={{ cursor: 'pointer' }}
                        onClick={handleSearch}
                    />
                </div>
            </Modal>
        </Portal>
    )
}
