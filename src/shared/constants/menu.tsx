
import { Clapperboard, Popcorn } from "lucide-react";
import { AppRoutes } from "shared/config/routeConfig/routeConfig";


export const menu = [
    { id: 1, text: 'Фильмы', url: AppRoutes.FILMS, icon: <Popcorn  size={20} /> },
    { id: 2, text: 'Сериалы', url: AppRoutes.SERIES, icon: <Clapperboard  size={20} /> },
 ];
 
 