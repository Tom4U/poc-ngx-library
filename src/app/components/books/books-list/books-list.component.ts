import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionButton } from 'src/app/controls/actions/models/action-button.model';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
})
export class BooksListComponent implements OnInit {
  @Input() books: Book[] = [];
  @Output() editBook = new EventEmitter<Book>();
  @Output() addBook = new EventEmitter();

  actions: ActionButton[] = [];

  get hasNoBooks() {
    return this.books.length === 0;
  }

  constructor() {
    const addBookAction = new ActionButton('Buch hinzufügen');
    addBookAction.callback = () => this.addBook.emit();
    addBookAction.cssClass = 'button-big bg-button-action';

    this.actions.push(addBookAction);
  }

  ngOnInit(): void {}
}
