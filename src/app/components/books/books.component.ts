import { Component, Input, OnInit } from '@angular/core';
import { BookState } from 'src/app/components/books/models/book-state.enum';
import { Book } from 'src/app/components/books/models/book.model';
import { ActionButton } from 'src/app/controls/actions/models/action-button.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  @Input() title = '';

  books: Book[] = [];
  showForm = false;
  bookForForm = new Book('');

  headerActions: ActionButton[] = [];

  private readonly storageKey = 'books';

  constructor() {
    this.loadBooks();

    if (this.books.length > 0) {
      const headerAction = new ActionButton('Buch hinzufügen');
      headerAction.cssClass = 'button-small bg-button-action';
      headerAction.callback = () => this.toggleForm();

      this.headerActions.push(headerAction);
    }
  }

  ngOnInit(): void {
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  editBook(book: Book): void {
    this.bookForForm = book;

    this.toggleForm();
  }

  storeBook(): void {
    if (this.bookForForm.id === 0)
      this.addBook();
    else
      this.updateBook();

    this.bookForForm = new Book('');

    this.persistBooks();
    this.loadBooks();
    this.toggleForm();
  }

  cancelForm(): void {
    this.bookForForm = new Book('');
    this.toggleForm();
  }

  deleteBook(): void {
    this.books = this.books.filter(book => book.id !== this.bookForForm.id);
    this.persistBooks();
    this.toggleForm();
  }

  private addBook(): void {
    this.bookForForm.id = this.calculateNextId();
    this.books.push(this.bookForForm);
  }

  private updateBook(): void {
    const updatedBooks = this.books.map(book => {
      if (book.id === this.bookForForm.id)
        return this.bookForForm;

      return book;
    });

    this.books = updatedBooks;
  }

  private persistBooks(): void {
    sessionStorage.setItem(this.storageKey, JSON.stringify(this.books));
  }

  private loadBooks(): void {
    const rawBooks = sessionStorage.getItem(this.storageKey) || '[]';
    const plainArray: Book[] = JSON.parse(rawBooks);

    this.books = plainArray.map(bookObject => {
      const book = new Book('');

      return Object.assign(book, bookObject);
    });
  }

  private calculateNextId(): number {
    return this.books.reduce((previous: number) => ++previous, 1)
  }
}
