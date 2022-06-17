import { Component, Input } from '@angular/core';
import { Book } from 'src/app/components/books/models/book.model';
import { ActionButton } from 'src/app/controls/actions/models/action-button.model';
import { BooksService } from './books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent {
  @Input() title = '';

  books: Book[] = [];
  showForm = false;

  headerActions: ActionButton[] = [];

  constructor(private booksSvc: BooksService) {
    this.registerForBooksUpdate(booksSvc);
    this.registerForFormActivation(booksSvc);

    booksSvc.loadBooks();
  }

  private registerForBooksUpdate(booksSvc: BooksService) {
    booksSvc.booksUpdate.subscribe((books) => {
      this.books = books;

      this.validateHeaderActions();
    });
  }

  private registerForFormActivation(booksSvc: BooksService) {
    booksSvc.activateForm.subscribe((showForm) => {
      this.showForm = showForm;
      this.validateHeaderActions();
    });
  }

  private validateHeaderActions(): void {
    this.headerActions = [];

    if (this.books.length > 0 && !this.showForm) {
      const headerAction = new ActionButton('Buch hinzufügen');
      headerAction.cssClass = 'button-small bg-button-action';
      headerAction.callback = () => this.booksSvc.showForm(true);

      this.headerActions.push(headerAction);
    }
  }
}
