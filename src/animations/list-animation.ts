import { animate, animateChild, query, stagger, style, transition, trigger } from '@angular/animations';

/**
 * Angular animation configuration for a list of messages
 */
export const listAnimations = [
    trigger('list', [transition(':enter', [query('@items', stagger(100, animateChild()))])]),
    trigger('items', [
        transition(':enter', [
            style({ transform: 'scale(1)', opacity: 0, height: '0px' }),
            animate('1s ease-in-out', style({ transform: 'scale(1)', opacity: 1, height: '*' })),
        ]),
        transition(':leave', [
            style({ transform: 'scale(1)', opacity: 1, height: '*' }),
            animate('1s cubic-bezier(.8,-0.6,0.2,1.5)', style({ transform: 'scale(0.8)', opacity: 0, height: '0px' })),
        ]),
    ]),
];
