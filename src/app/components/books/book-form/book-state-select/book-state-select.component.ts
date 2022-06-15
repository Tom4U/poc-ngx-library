import { Component, Input } from '@angular/core';

@Component({
  selector: 'select.app-book-state-select',
  templateUrl: './book-state-select.component.html'
})
export class BookStateSelectComponent {
  @Input() availableStates: string[] = [];
  @Input() currentState: string = '';
}
