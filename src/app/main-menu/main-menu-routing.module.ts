import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MainMenuComponent} from "./main-menu.component";

const mainMenuRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MainMenuComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(mainMenuRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MainMenuRoutingModule {

}
