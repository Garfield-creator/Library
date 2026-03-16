import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { QuoteService } from '../../services/quote.service';
import { Quote } from '../../models/quote';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-quote-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quote-list.component.html',
  styleUrl: './quote-list.component.css',
})
export class QuoteListComponent implements OnInit {

  quotes: Quote[] = [];
  readonly maxQuotesPerUser = 5;

  constructor(
    private quoteService: QuoteService,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadQuotes();
  }

  loadQuotes(): void {
    this.quoteService.getAll().subscribe(data => {
      this.quotes = data;
      this.changeDetector.detectChanges();
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
}
