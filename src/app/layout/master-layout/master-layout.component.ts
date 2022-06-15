import { Component, Input } from '@angular/core';
import { ActionButton } from 'src/app/controls/actions/models/action-button.model';

@Component({
  selector: 'app-master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.css']
})
export class MasterLayoutComponent {
  @Input() mainTitle = '';
  @Input() headerActions: ActionButton[] = [];
}
