import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SelectWeaponResolver} from "./weapon-list/services/select-weapon.resolver";
import {SelectArmoryComponent} from "./select-armory.component";

const selectWeaponRoutes: Routes = [
  {
    path: 'user/:id',
    pathMatch: 'full',
    component: SelectArmoryComponent,
    resolve: { activeUsers: SelectWeaponResolver },
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
export class SelectArmoryRoutingModule {}
