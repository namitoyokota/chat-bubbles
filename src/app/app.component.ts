import { animate, animateChild, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { asyncScheduler, Subject } from 'rxjs';

class Message {
    constructor(public id = '', public text = '') {
        this.id = id;
        this.text = text;
    }
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        trigger('list', [transition(':enter', [query('@items', stagger(100, animateChild()))])]),
        trigger('items', [
            transition(':leave', [
                style({ transform: 'scale(1)', opacity: 1, height: '*' }),
                animate('1s cubic-bezier(.8,-0.6,0.2,1.5)', style({ transform: 'scale(0.8)', opacity: 0, height: '0px' })),
            ]),
        ]),
    ],
})
export class AppComponent implements OnInit {
    messages: Message[] = [new Message(crypto.randomUUID(), '')];

    @ViewChild('sentSound') sentSound: ElementRef;

    @ViewChild('newMessageInput', { static: false }) newMessageInput: ElementRef;

    private removeMessage = new Subject<void>();

    private removeMessage$ = this.removeMessage.asObservable();

    constructor() {}

    ngOnInit(): void {
        this.removeMessage$.subscribe(() => {
            this.messages.pop();
        });
    }

    sendMessage(): void {
        if (!this.messages[0]) {
            return;
        }

        this.messages.unshift(new Message(crypto.randomUUID(), ''));
        this.playSound();
        asyncScheduler.schedule(() => this.removeMessage.next(), 8000);
    }

    focusBackToInput(): void {
        this.newMessageInput.nativeElement.focus();
    }

    private playSound(): void {
        if (this.sentSound.nativeElement.paused) {
            this.sentSound.nativeElement.play();
        } else {
            this.sentSound.nativeElement.currentTime = 0;
        }
    }
}
