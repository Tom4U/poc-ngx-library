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

  get hasNoBooks() {
    return this.books.length === 0;
  }

  constructor() {
    this.loadBooks();
  }

  private loadBooks(): void {
    for (let i = 1; i < 6; i++) {
      const title = `Buchtitel ${i}`;
      const state = i % 2 === 0 ? BookState.available : BookState.lent;
      this.generateBook(title, state);
    }
  }

  private generateBook(title: string, state: BookState): void {
    const book = new Book(title);
    book.state = state;
    book.id = this.calculateNextId();

    this.books.push(book);
  }

  private calculateNextId(): number {
    return this.books.reduce((previous: number) => ++previous, 1)
  }
}
