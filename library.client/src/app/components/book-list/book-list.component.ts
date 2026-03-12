import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-list.component.html'
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  filteredBooks: Book[] = [];

  searchTerm = '';
  pageSize = 5;
  currentPage = 1;

  constructor(
    private bookService: BookService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getAll().subscribe(data => {
      this.books = data;
      this.applyFilterAndPagination();
      this.cdr.detectChanges();
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

  confirmDelete(id: number): void {
    if (confirm('Är du säker på att du vill ta bort den här boken?')) {
      this.delete(id);
    }
  }

  trackById(index: number, book: Book): number {
    return book.id;
  }

  onSearchChange(term: string): void {
    this.searchTerm = term;
    this.currentPage = 1;
    this.applyFilterAndPagination();
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.applyFilterAndPagination();
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredCount / this.pageSize));
  }

  get filteredCount(): number {
    return this.getFilteredBooks().length;
  }

  get pagedBooks(): Book[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.getFilteredBooks().slice(start, start + this.pageSize);
  }

  private applyFilterAndPagination(): void {
    this.filteredBooks = this.getFilteredBooks();
  }

  private getFilteredBooks(): Book[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return this.books;
    }
    return this.books.filter(b =>
      b.title.toLowerCase().includes(term) ||
      b.author.toLowerCase().includes(term)
    );
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
