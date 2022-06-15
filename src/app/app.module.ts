import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BooksComponent } from './components/books/books.component';
import { BookFormComponent } from './components/books/book-form/book-form.component';
import { BooksListComponent } from './components/books/books-list/books-list.component';
import { MasterLayoutComponent } from './layout/master-layout/master-layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { ContentComponent } from './layout/content/content.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ActionsComponent } from './controls/actions/actions.component';
import { BookStateSelectComponent } from './components/books/book-form/book-state-select/book-state-select.component';
import { CopyrightComponent } from './controls/copyright/copyright.component';
import { BookItemComponent } from './components/books/books-list/book-item/book-item.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BookFormComponent,
    BooksListComponent,
    BookItemComponent,
    MasterLayoutComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    ActionsComponent,
    BookStateSelectComponent,
    CopyrightComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
