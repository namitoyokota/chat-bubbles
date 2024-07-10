import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [],
})
export class AppComponent {
    newMessage = '';

    sentMessages: string[] = [];

    @ViewChild('sentSound') sentSound: ElementRef;

    @ViewChild('newMessageInput', { static: false }) newMessageInput: ElementRef;

    constructor() {}

    sendMessage(): void {
        if (!this.newMessage) {
            return;
        }

        this.sentMessages.push(this.newMessage);
        this.newMessage = '';
        this.playSound();
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
