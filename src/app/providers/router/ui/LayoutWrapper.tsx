import { ReactNode, useMemo } from "react";
import { isMobile } from "react-device-detect";
import { useLocation } from "react-router-dom";
import { routeConfig } from "shared/config/routeConfig/routeConfig";
import { Navbar } from "widgets/NavbarNotReg";
import NavbarMobile from "widgets/NavbarNotReg/ui/NavbarMobile/NavbarMobile";

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
           {isMobile ? <NavbarMobile /> : <Navbar />}
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

