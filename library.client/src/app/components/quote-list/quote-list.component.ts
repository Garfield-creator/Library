import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { QuoteService } from '../../services/quote.service';
import { Quote } from '../../models/quote';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-quote-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quote-list.component.html',
  styleUrl: './quote-list.component.css',
})
export class QuoteListComponent implements OnInit {

  quotes: Quote[] = [];
  searchTerm = '';
  pageSize = 5;
  currentPage = 1;

  constructor(
    private quoteService: QuoteService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadQuotes();
  }

  loadQuotes(): void {
    this.quoteService.getAll().subscribe(data => {
      this.quotes = data;
      this.cdr.detectChanges();
    });
  }

  delete(id: number): void {
    this.quoteService.delete(id).subscribe(() => {
      this.loadQuotes();
    });
  }

  confirmDelete(id: number): void {
    if (confirm('Are you sure you want to delete this quote?')) {
      this.delete(id);
    }
  }

  goToCreate(): void {
    this.router.navigate(['/quote/create']);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/quote/edit', id]);
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  onSearchChange(term: string): void {
    this.searchTerm = term;
    this.currentPage = 1;
  }

  get filteredQuotes(): Quote[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return this.quotes;
    }
    return this.quotes.filter(q =>
      q.text.toLowerCase().includes(term) ||
      (q.source ?? '').toLowerCase().includes(term)
    );
  }

  get filteredCount(): number {
    return this.filteredQuotes.length;
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredCount / this.pageSize));
  }

  get pagedQuotes(): Quote[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredQuotes.slice(start, start + this.pageSize);
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
  }
}
