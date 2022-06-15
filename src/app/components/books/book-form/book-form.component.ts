import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionButton } from 'src/app/controls/actions/models/action-button.model';
import { BookState } from '../models/book-state.enum';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  @Input() book = new Book('');
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();
  @Output() delete = new EventEmitter();

  availableStates = ['Verfügbar', 'Ausgeliehen'];
  actions: ActionButton[] = [];

  get bookState(): string {
    if (this.book.state === BookState.available)
      return this.availableStates[0];

    return this.availableStates[1];
  }

  generateButton(title: string, css: string, callback: () => void): void {
    const actionButton = new ActionButton(title);
    actionButton.cssClass = `button-small ${css}`;
    actionButton.callback = () => callback();

    this.actions.push(actionButton);
  }

  ngOnInit(): void {
    this.generateButton('Abbrechen', 'bg-button-cancel', () => this.cancel.emit());
    this.generateButton('Buch speichern', 'bg-button-action', () => this.save.emit());

    if (this.book.id !== 0)
    this.generateButton('Löschen', 'bg-button-cancel', () => this.delete.emit());
  }

  formBookStateChange(event: Event): void {
    const select = <HTMLSelectElement>event.target;
    const selected = select.selectedOptions[0].value;

    if (selected === this.availableStates[0])
      this.book.state = BookState.available
    else
      this.book.state = BookState.lent
  }
}
