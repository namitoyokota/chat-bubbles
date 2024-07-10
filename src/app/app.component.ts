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

    @ViewChild('newMessageInput', { static: false }) newMessageInput: ElementRef;

    constructor() {}

    sendMessage(): void {
        this.sentMessages.push(this.newMessage);
        this.newMessage = '';
    }

    focusBackToInput(): void {
        this.newMessageInput.nativeElement.focus();
    }
}
