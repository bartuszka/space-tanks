import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {GameComponent} from "./game.component";
import {RouteDataAnimation} from "../models/route-data-animation.model";

const gameRoutes: Routes = [
  {
    path: '',
    component: GameComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'space-tanks-main-menu'
      },
      {
        path: 'space-tanks-main-menu',
        loadChildren: () => import('../main-menu/main-menu.module').then(m => m.MainMenuModule),
        data: { animation: { page: RouteDataAnimation.MAIN_MENU_PAGE } }
      },
      {
        path: 'select-weapon',
        loadChildren: () => import('../select-weapon/select-armory.module').then(m => m.SelectArmoryModule),
        data: { animation: { page: RouteDataAnimation.SELECT_WEAPON_PAGE } }
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(gameRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class GameRoutingModule {}
