import { HttpParams } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { asyncScheduler, Subject } from 'rxjs';
import { Configuration } from 'src/abstractions/configuration';
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

    configuration = new Configuration();

    @ViewChild('newMessageInput', { static: false }) newMessageInput: ElementRef;

    private removeMessage = new Subject<void>();

    private removeMessage$ = this.removeMessage.asObservable();

    constructor() {}

    ngOnInit(): void {
        this.getConfigurations();
        this.removeMessage$.subscribe(() => {
            this.messages.pop();
        });
    }

    getConfigurations(): void {
        Object.keys(this.configuration).forEach((key) => {
            this.configuration[key] = this.getParamValueQueryString(key) ?? this.configuration[key];
        });
    }

    sendMessage(): void {
        if (!this.messages[0]) {
            return;
        }

        this.messages.unshift(new Message(''));
        asyncScheduler.schedule(() => this.removeMessage.next(), this.configuration.disappearAfter * 1000);
    }

    sortedMessages(): Message[] {
        return this.messages
            .filter((message) => !!message.text.trim())
            .slice()
            .reverse();
    }

    focusBackToInput(): void {
        this.newMessageInput.nativeElement.focus();
    }

    private getParamValueQueryString(paramName): string {
        const url = window.location.href;
        let paramValue = '';
        if (url.includes('?')) {
            const httpParams = new HttpParams({ fromString: url.split('?')[1] });
            paramValue = httpParams.get(paramName);
        }

        return paramValue;
    }
}
