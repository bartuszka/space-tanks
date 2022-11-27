import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

const gameRoutes: Routes = [
  {
    path: 'space-tanks-main-menu',
    loadChildren: () => import('../main-menu/main-menu.module').then(m => m.MainMenuModule)
  },
  {
    path: 'select-weapon',
    loadChildren: () => import('../select-weapon/select-weapon.module').then(m => m.SelectWeaponModule)
  },
  {
    path: '**',
    redirectTo: 'space-tanks-main-menu'
  }
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
