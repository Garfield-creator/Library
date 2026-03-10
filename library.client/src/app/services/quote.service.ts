import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quote } from '../models/quote';
import { QuoteCreateDto } from '../models/quoteCreateDto';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  private apiUrl = 'https://localhost:7225/api/quotes';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Quote[]> {
    return this.http.get<Quote[]>(this.apiUrl);
  }

  getById(id: number): Observable<Quote> {
    return this.http.get<Quote>(`${this.apiUrl}/${id}`);
  }

  create(quote: QuoteCreateDto): Observable<QuoteCreateDto> {
    return this.http.post<QuoteCreateDto>(this.apiUrl, quote);
  }

  update(id: number, quote: QuoteCreateDto) {
    return this.http.put(`${this.apiUrl}/${id}`, quote);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

