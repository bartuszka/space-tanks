import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SelectWeaponComponent} from "./select-weapon.component";
import {WeaponsListResolver} from "./weapon-list/services/weapons-list.resolver";

const selectWeaponRoutes: Routes = [
  {
    path: 'user/:id',
    pathMatch: 'full',
    component: SelectWeaponComponent,
    resolve: { weaponList: WeaponsListResolver },
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(selectWeaponRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SelectWeaponRoutingModule {}
