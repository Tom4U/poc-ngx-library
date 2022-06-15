import { Component, Input } from '@angular/core';
import { ActionButton } from './models/action-button.model';

@Component({
  selector: '.app-actions',
  templateUrl: './actions.component.html'
})
export class ActionsComponent {
  @Input() actions: ActionButton[] = [];

  buttonClick(action: ActionButton) {
    if (action.callback)
      action.callback();
  }
}
