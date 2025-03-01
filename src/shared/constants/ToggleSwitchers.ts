export enum SwitcherType {
    PROJECTS = "Projects",
    MY_PROJECTS = "MyProjects",
    VACANCIES = "Vacancies",
    MY_VACANCIES = "MyVacancies",
    EVENTS = "Events",
    MY_EVENTS = "MyEvents",
}


export const SwitcherOptions = {
    [SwitcherType.PROJECTS]: { label: "Проекты", value: SwitcherType.PROJECTS },
    [SwitcherType.MY_PROJECTS]: { label: "Мои проекты", value: SwitcherType.MY_PROJECTS },
    [SwitcherType.VACANCIES]: { label: "Вакансии", value: SwitcherType.VACANCIES },
    [SwitcherType.MY_VACANCIES]: { label: "Мои вакансии", value: SwitcherType.MY_VACANCIES },
    [SwitcherType.EVENTS]: { label: "Мероприятия", value: SwitcherType.EVENTS },
    [SwitcherType.MY_EVENTS]: { label: "Мои мероприятия", value: SwitcherType.EVENTS },
};
