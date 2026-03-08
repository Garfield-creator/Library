import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { BookCreateDto } from '../../models/bookCreateDto';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-form.component.html'
})
export class BookFormComponent implements OnInit {

  form!: FormGroup;

  bookId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.form = this.fb.group({
      title: [''],
      author: [''],
      publishingDate: ['']
    });

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.bookId = +id;
      this.bookService.getById(this.bookId)
        .subscribe(book => this.form.patchValue(book));
    }
  }


  submit() {
    const formValue = this.form.value;
    console.log("Submit clicked");
    const dto = {
      title: formValue.title,
      author: formValue.author,
      publishingDate: formValue.publishingDate // string "YYYY-MM-DD" works
    };
    console.log(dto);
    this.bookService.create(dto)
      .subscribe(() => this.router.navigate(['/books']));
  }

  //submit() {
  //  console.log("Submit clicked");
  //  const book = this.form.value as BookCreateDto;
  //  console.log(book);
  //  if (this.bookId) {
  //    this.bookService.update(this.bookId, book)
  //      .subscribe(() => this.router.navigate(['/books']));
  //  } else {
  //    this.bookService.create(book)
  //      .subscribe(() => this.router.navigate(['/books']));
   // }
  //}
}
