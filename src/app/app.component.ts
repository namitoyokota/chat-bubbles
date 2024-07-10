import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fadeOutOnLeaveAnimation } from 'angular-animations';
import { asyncScheduler, Subject } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [fadeOutOnLeaveAnimation()],
})
export class AppComponent implements OnInit {
    newMessage = '';

    sentMessages: string[] = [];

    @ViewChild('sentSound') sentSound: ElementRef;

    @ViewChild('newMessageInput', { static: false }) newMessageInput: ElementRef;

    private removeMessage = new Subject<void>();

    private removeMessage$ = this.removeMessage.asObservable();

    constructor() {}

    ngOnInit(): void {
        this.removeMessage$.subscribe(() => {
            this.sentMessages.shift();
        });
    }

    sendMessage(): void {
        if (!this.newMessage) {
            return;
        }

        this.sentMessages.push(this.newMessage);
        this.newMessage = '';
        this.playSound();

        asyncScheduler.schedule(() => this.removeMessage.next(), 5000);
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
