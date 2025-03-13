import { ReactNode, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { routeConfig } from "shared/config/routeConfig/routeConfig";
import { Navbar } from "widgets/NavbarNotReg";

interface LayoutWrapperProps {
    children: ReactNode;
}

export const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
    const location = useLocation();

    const hideLayout = useMemo(() => {
        return Object.values(routeConfig).some(route => route.path === location.pathname && route.hideLayout);
    }, [location.pathname]);

    return (
        <>
            <Navbar />
            {hideLayout ? (
                <>{children}</>
            ) : (
                <div className="content-page">
                    <>{children}</>
                </div>
            )}
        </>
    );
};

