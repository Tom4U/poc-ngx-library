import { EventEmitter, Injectable } from '@angular/core';
import { Book } from './models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private readonly STORAGE_KEY = 'books';

  private books: Book[] = [];
  private selectedBook: Book = new Book('');

  booksUpdate = new EventEmitter<Book[]>();
  activateForm = new EventEmitter<boolean>();

  loadBooks(): void {
    const rawBooks = sessionStorage.getItem(this.STORAGE_KEY) || '[]';
    const plainArray: Book[] = JSON.parse(rawBooks);

    this.books = plainArray.map((bookObject) => {
      const book = new Book('');

      return Object.assign(book, bookObject);
    });

    this.booksUpdate.emit(this.books);
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
  }

  getSelectedBook(): Book {
    return this.selectedBook;
  }

  showForm(showForm: boolean): void {
    this.activateForm.emit(showForm);
  }

  storeBook(book: Book): void {
    if (book.id === 0) this.addBook(book);
    else this.updateBook(book);

    this.persistBooks();
    this.loadBooks();
  }

  deleteBook(bookForDeletion: Book): void {
    this.books = this.books.filter((book) => book.id !== bookForDeletion.id);

    this.persistBooks();
    this.loadBooks();
  }

  private calculateNextId(): number {
    return this.books.reduce((previous: number) => ++previous, 1);
  }

  private addBook(book: Book): void {
    book.id = this.calculateNextId();
    this.books.push(book);
  }

  private updateBook(updatedBook: Book): void {
    const updatedBooks = this.books.map((book) => {
      if (book.id === updatedBook.id) return updatedBook;

      return book;
    });

    this.books = updatedBooks;
  }

  private persistBooks(): void {
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.books));
  }
}
