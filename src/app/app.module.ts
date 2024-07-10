import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutoResizeDirective } from 'src/directives/auto-resize.directive';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent, AutoResizeDirective],
    imports: [BrowserModule, FormsModule, BrowserAnimationsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
