import {animate, group, query, style, transition, trigger} from "@angular/animations";

export const routeAnimations = [
  trigger('routeState', [
    transition('* => *', [
      group([
        query(':enter', [
          style({
            top: '-50%',
            opacity: 0,
          }),
          animate('500ms ease-out')
        ], { optional: true }),
        query(':leave', [
          animate('500ms ease-out', style({
            top: '50%',
          }))
        ], { optional: true })
      ])
    ])
  ])
]
