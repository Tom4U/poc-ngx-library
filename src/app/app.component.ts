import { Component } from '@angular/core';
import { BookState } from './book-state.enum';
import { Book } from './book.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Meine kleine Bibliothek';
  year = new Date().getFullYear();
  books: Book[] = [];
  showForm = false;
  bookForForm = new Book('');
  availableStates = ['Verfügbar', 'Ausgeliehen'];

  get bookForFormState(): string {
    if (this.bookForForm.state === BookState.available)
      return this.availableStates[0];

    return this.availableStates[1];
  }

  private readonly storageKey = 'books';

  get hasNoBooks() {
    return this.books.length === 0;
  }

  constructor() {
    this.loadBooks();
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

  deleteBook(): void {
    this.books = this.books.filter(book => book.id !== this.bookForForm.id);
    this.persistBooks();
    this.toggleForm();
  }

  formBookStateChange(event: Event): void {
    const select = <HTMLSelectElement>event.target;
    const selected = select.selectedOptions[0].value;

    if (selected === this.availableStates[0])
      this.bookForForm.state = BookState.available
    else
      this.bookForForm.state = BookState.lent
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
