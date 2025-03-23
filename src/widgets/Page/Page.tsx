import classNames from "shared/library/classNames/classNames";
import s from './Page.module.scss'
import { ReactNode } from "react";


interface PageProps {
    className?: string;
    children: ReactNode
}

export const Page = ({className, children}: PageProps) => {
    return (
        <main className={classNames(s.Page, {}, [className])}>
            {children}
        </main>
    );
};