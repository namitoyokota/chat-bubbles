import { AfterViewInit, Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[autoResize]',
})
export class AutoResizeDirective implements AfterViewInit {
    private defaultHeight = '';

    constructor(private elementRef: ElementRef) {}

    @HostListener(':keydown', ['$event'])
    onKeydown(event: KeyboardEvent) {
        if (event.key == 'Enter') {
            event.preventDefault();
            this.elementRef.nativeElement.style.height = this.defaultHeight;
            return;
        }

        this.resize();
    }

    ngAfterViewInit() {
        if (this.elementRef.nativeElement.scrollHeight) {
            this.defaultHeight = this.resize();
        }
    }

    resize(): string {
        this.elementRef.nativeElement.style.height = '0';
        this.elementRef.nativeElement.style.height = this.elementRef.nativeElement.scrollHeight + 'px';

        return this.elementRef.nativeElement.style.height;
    }
}
