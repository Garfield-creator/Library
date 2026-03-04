import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookReadDto } from '../Models/book-read-dto';

@Component({
  selector: 'app-book-list',
  standalone: true,
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: BookReadDto[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<BookReadDto[]>('https://localhost:5001/api/books')
      .subscribe(result => {
        this.books = result;
      });
  }
}
