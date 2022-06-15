import { Component, Input } from '@angular/core';

@Component({
  selector: '.app-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.css']
})
export class CopyrightComponent {
  @Input() year = new Date().getFullYear();
  @Input() copyrightHolder = 'me :)';
}
