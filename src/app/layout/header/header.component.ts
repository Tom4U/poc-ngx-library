import { Component, Input } from '@angular/core';
import { ActionButton } from 'src/app/controls/actions/models/action-button.model';

@Component({
  selector: '.app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() mainTitle = '';
  @Input() actions: ActionButton[] = [];

  get hasActions(): boolean {
    return this.actions.length > 0;
  }
}
