import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { QuoteListComponent } from './components/quote-list/quote-list.component';
import { QuoteFormComponent } from './components/quote-form/quote-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BookListComponent },
  { path: 'books/create', component: BookFormComponent },
  { path: 'books/edit/:id', component: BookFormComponent },
  { path: 'quote', component: QuoteListComponent },
  { path: 'quote/create', component: QuoteFormComponent },
  { path: 'quote/edit/:id', component: QuoteFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];
