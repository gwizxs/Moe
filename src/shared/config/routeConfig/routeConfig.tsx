import { LoginPage } from "pages/Auth/LoginPage";
import { NewPasswordPage } from "pages/Auth/NewPasswordPage";
import { RegistrationPage } from "pages/Auth/RegistrationPage";
import { ResetPasswordPage } from "pages/Auth/ResetPasswordPage";
import LandingPage from "pages/LandingPage/ui/LandingPage";
import { MainPage } from "pages/MainPage";
import { NotFoundPage } from "pages/NotFoundPage";
import { ProjectsPage } from "pages/ProjectsPage";
import VacancyPage from "pages/VacancyPage/ui/VacancyPage";
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
    PROJECTS = 'projects',
    EVENTS = 'events',
    VACANCIES = 'vacancies',
    EDUCATION = 'education',
    HELP = 'help',


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
    [AppRoutes.PROJECTS]: '/projects',
    [AppRoutes.EVENTS]: '/events',
    [AppRoutes.VACANCIES]: '/vacancies',
    [AppRoutes.EDUCATION]: '/education',
    [AppRoutes.HELP]: '/help',

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

    [AppRoutes.PROJECTS]: {
        path: RoutePath.projects,
        element: <ProjectsPage />,
    },
    [AppRoutes.EVENTS]: {
        path: RoutePath.events,
        element: <MainPage />,
    },
    [AppRoutes.VACANCIES]: {
        path: RoutePath.vacancies,
        element: <VacancyPage />,
    },
    [AppRoutes.EDUCATION]: {
        path: RoutePath.education,
        element: <MainPage />,
    },
    [AppRoutes.HELP]: {
        path: RoutePath.help,
        element: <MainPage />,
    },

    // ------------- ВЕБ ------------------

    // всегда должен быть последним 
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
