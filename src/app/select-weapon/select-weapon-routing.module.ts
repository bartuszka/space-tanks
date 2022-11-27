import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SelectWeaponComponent} from "./select-weapon.component";
import {SelectWeaponResolver} from "./weapon-list/services/select-weapon.resolver";

const selectWeaponRoutes: Routes = [
  {
    path: 'user/:id',
    pathMatch: 'full',
    component: SelectWeaponComponent,
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
export class SelectWeaponRoutingModule {}
