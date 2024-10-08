import { Component } from '@angular/core';

@Component({
  selector: 'carplates-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentDateYear: number = new Date().getFullYear();

  public throwTestError(): void {
    throw new Error('Sentry Test Error');
  }
}
