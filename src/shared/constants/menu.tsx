
import { Clapperboard, Popcorn } from "lucide-react";
import { AppRoutes, RoutePath } from "shared/config/routeConfig/routeConfig";


export const menu = [
    { id: 0, text: 'Главная', url: RoutePath.landing, icon: <Clapperboard  size={20} /> },
    { id: 1, text: 'Релизы', url: AppRoutes.RELEASES, icon: <Popcorn size={20} /> },
    { id: 2, text: 'Сериалы', url: AppRoutes.SERIES, icon: <Clapperboard  size={20} /> },
 ];
 
 