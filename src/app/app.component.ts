import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<app-books [title]="title"></app-books>`
})
export class AppComponent {
  title = 'Meine kleine Bibliothek';
}
