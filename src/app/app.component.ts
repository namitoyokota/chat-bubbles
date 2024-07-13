import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { asyncScheduler, Subject } from 'rxjs';
import { Message } from 'src/abstractions/message';
import { listAnimations } from 'src/animations/list-animation';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [listAnimations],
})
export class AppComponent implements OnInit {
    messages: Message[] = [new Message('')];

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

        this.messages.unshift(new Message(''));
        this.playSound();
        asyncScheduler.schedule(() => this.removeMessage.next(), 8000);
    }

    sortedMessages(): Message[] {
        return this.messages
            .filter((message) => !!message.text)
            .slice()
            .reverse();
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
