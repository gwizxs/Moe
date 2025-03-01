
import { Clapperboard, Popcorn } from "lucide-react";
import { AppRoutes } from "shared/config/routeConfig/routeConfig";


export const menu = [
    { id: 1, text: 'Фильмы', url: AppRoutes.PROJECTS, icon: <Popcorn  size={20} /> },
    { id: 2, text: 'Сериалы', url: AppRoutes.EVENTS, icon: <Clapperboard  size={20} /> },
 ];
 
 