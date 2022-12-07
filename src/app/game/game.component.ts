import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {RouteDataAnimation} from "../models/route-data-animation.model";
import {animate, group, query, style, transition, trigger} from "@angular/animations";
import {routeAnimations} from "./animations/route-animations";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  animations: routeAnimations,
})
export class GameComponent {
  public RouteDataAnimations: typeof RouteDataAnimation = RouteDataAnimation;

  public getRouterAnimationData(routerOutlet: RouterOutlet): string {
    const routeData = routerOutlet.activatedRouteData['animation'];
    return !routeData ? 'mainMenuPage' : routeData['page'];
  }
}
