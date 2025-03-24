import { AnimeDetailsPage } from "pages/AnimeDetailsPage";
import { AnimeDetailsVideoPage } from "pages/AnimeDetailsPage/ui/AnimeDetailsVideoPage/AnimeDetailsVideoPage";
import { LoginPage } from "pages/Auth/LoginPage";
import { NewPasswordPage } from "pages/Auth/NewPasswordPage";
import { RegistrationPage } from "pages/Auth/RegistrationPage";
import { ResetPasswordPage } from "pages/Auth/ResetPasswordPage";
import { FilmsPage } from "pages/FilmsPage";
import { FranchisesPage } from "pages/FranchisesPage";
import LandingPage from "pages/LandingPage/ui/LandingPage";
import { NotFoundPage } from "pages/NotFoundPage";
import { SeriesPage } from "pages/SeriesPages";
import { RouteProps } from "react-router-dom";

export type AppRoutesProps = RouteProps & {
    // тут происходит скрытие сайдбара и навбара
    //  в зависимости от роута
    hideLayout?: boolean;
}

export enum AppRoutes {
    LANDING = 'landing',

    // аутентификация 
    LOGIN = 'login',
    REGISTRATION = 'registration',
    NEW_PASSWORD = 'new-password',
    RESET_PASSWORD = 'reset-password',

    // ВСЕ ЧТО ОТНОСИТСЯ К ВЕБ 
    ANIME_DETAILS = 'anime-details',
    RELEASES = 'releases',
    FRANCHISES = 'franchises',
    SERIES = 'series',
    ANIME_DETAILS_VIDEO = 'anime-details-video',



    // ДОЛЖНА БЫТЬ САМОЙ ПОСЛЕДНЕЙ
    NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.LANDING]: '/',

    // ------------- аутентификация ------------------
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.REGISTRATION]: '/registration',
    [AppRoutes.NEW_PASSWORD]: '/new-password',
    [AppRoutes.RESET_PASSWORD]: '/reset-password',
    // ------------- аутентификация ------------------

    // ------------- ВЕБ ------------------
    [AppRoutes.ANIME_DETAILS]: '/anime-details/', // + id
    [AppRoutes.RELEASES]: '/releases',
    [AppRoutes.FRANCHISES]: '/franchises',
    [AppRoutes.SERIES]: '/series',
    [AppRoutes.ANIME_DETAILS_VIDEO]: '/anime-details-video/',

    // ------------- ВЕБ ------------------

    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.LANDING]: {
        path: RoutePath.landing,
        hideLayout: true,
        element: <LandingPage />,
    },

    // ------------- аутентификация ------------------
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        hideLayout: true,
        element: <LoginPage />,
    },
    [AppRoutes.REGISTRATION]: {
        path: RoutePath.registration,
        hideLayout: true,
        element: <RegistrationPage />,
    },
    [AppRoutes.NEW_PASSWORD]: {
        path: RoutePath["new-password"],
        hideLayout: true,
        element: <NewPasswordPage />,
    },
    [AppRoutes.RESET_PASSWORD]: {
        path: RoutePath["reset-password"],
        hideLayout: true,
        element: <ResetPasswordPage />,
    },
    // ------------- аутентификация ------------------

    // ------------- ВЕБ ------------------
    [AppRoutes.ANIME_DETAILS]: {
        path: `${RoutePath["anime-details"]}:id`,
        element: <AnimeDetailsPage />,
    },
    [AppRoutes.RELEASES]: {
        path: RoutePath.releases,
        element: <FilmsPage />,
    },
    [AppRoutes.SERIES]: {
        path: RoutePath.series,
        element: <SeriesPage />,
    },
    [AppRoutes.FRANCHISES]: {
        path: RoutePath.franchises,
        element: <FranchisesPage />,
    },
    [AppRoutes.ANIME_DETAILS_VIDEO]: {
        path: `${RoutePath["anime-details-video"]}:id`,
        hideLayout: true,
        element: <AnimeDetailsVideoPage />,
    },

    // ------------- ВЕБ ------------------

    // всегда должен быть последним 
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
        hideLayout: true
    },
};
