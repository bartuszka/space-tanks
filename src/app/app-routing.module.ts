import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameStateResolver } from "./game/game-state.resolver";

const routes: Routes = [
  {
    path: 'space-tanks',
    loadChildren: () => import('./game/game.module').then(m => m.GameModule),
    resolve: { gameState: GameStateResolver }
  },
  {
    path: '**',
    redirectTo: 'space-tanks',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
