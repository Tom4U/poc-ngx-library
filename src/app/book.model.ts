import { BookState } from "./book-state.enum";

export class Book {
  id = 0;
  state = BookState.available;

  constructor(public title: string) {}

  isAvailable(): boolean {
    return this.state === BookState.available;
  }
}
