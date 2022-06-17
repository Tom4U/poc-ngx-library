import { Component } from '@angular/core';
import { ActionButton } from 'src/app/controls/actions/models/action-button.model';
import { BooksService } from '../books.service';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
})
export class BooksListComponent {
  books: Book[] = [];
  actions: ActionButton[] = [];

  get hasNoBooks() {
    return this.books.length === 0;
  }

  constructor(private booksSvc: BooksService) {
    const addBookAction = new ActionButton('Buch hinzufügen');
    addBookAction.callback = () => this.booksSvc.showForm(true);
    addBookAction.cssClass = 'button-big bg-button-action';

    this.actions.push(addBookAction);

    this.registerForBooksUpdate();
  }

  selectBook(book: Book): void {
    this.booksSvc.selectBook(book);
    this.booksSvc.showForm(true);
  }

  private registerForBooksUpdate() {
    this.booksSvc.booksUpdate.subscribe((books) => (this.books = books));
    this.booksSvc.loadBooks();
  }
}
