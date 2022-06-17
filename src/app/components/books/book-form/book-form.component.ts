import { Component, OnInit } from '@angular/core';
import { ActionButton } from 'src/app/controls/actions/models/action-button.model';
import { BooksService } from '../books.service';
import { BookState } from '../models/book-state.enum';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
})
export class BookFormComponent implements OnInit {
  book = new Book('');

  availableStates = ['Verfügbar', 'Ausgeliehen'];
  actions: ActionButton[] = [];

  get bookState(): string {
    if (this.book.state === BookState.available) return this.availableStates[0];

    return this.availableStates[1];
  }

  constructor(private booksSvc: BooksService) {}

  ngOnInit(): void {
    this.book = this.booksSvc.getSelectedBook();

    this.generateButton('Abbrechen', 'bg-button-cancel', () => this.cancel());
    this.generateButton('Buch speichern', 'bg-button-action', () =>
      this.save()
    );

    if (this.book.id !== 0)
      this.generateButton('Löschen', 'bg-button-cancel', () => this.delete());
  }

  generateButton(title: string, css: string, callback: () => void): void {
    const actionButton = new ActionButton(title);
    actionButton.cssClass = `button-small ${css}`;
    actionButton.callback = () => callback();

    this.actions.push(actionButton);
  }

  formBookStateChange(event: Event): void {
    const select = <HTMLSelectElement>event.target;
    const selected = select.selectedOptions[0].value;

    if (selected === this.availableStates[0])
      this.book.state = BookState.available;
    else this.book.state = BookState.lent;
  }

  private save(): void {
    this.booksSvc.storeBook(this.book);
    this.booksSvc.selectBook(new Book(''));
    this.booksSvc.showForm(false);
  }

  private delete(): void {
    this.booksSvc.deleteBook(this.book);
    this.booksSvc.selectBook(new Book(''));
    this.booksSvc.showForm(false);
  }

  private cancel(): void {
    this.booksSvc.selectBook(new Book(''));
    this.booksSvc.showForm(false);
  }
}
