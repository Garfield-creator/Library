import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-list.component.html'
})
export class BookListComponent implements OnInit {

  books: Book[] = [];

  constructor(
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getAll().subscribe(data => {
      this.books = data;
    });
  }

  delete(id: number) {
    this.bookService.delete(id).subscribe(() => {
      this.loadBooks();
    });
  }

  goToCreate() {
    this.router.navigate(['/books/create']);
  }

  goToEdit(id: number) {
    this.router.navigate(['/books/edit', id]);
  }
}
