import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './book-form.component.html'
})
export class BookFormComponent implements OnInit {

  form!: FormGroup;
  bookId: number | null = null;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.submitted = false;

    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      author: ['', [Validators.required]],
      publishingDate: ['', [Validators.required]]
    });

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.bookId = +id;
      this.bookService.getById(this.bookId)
        .subscribe(book => {
          this.form.patchValue({
            ...book,
            publishingDate: this.formatDateForInput(book.publishingDate)
          });
        });
    }
  }

  private formatDateForInput(date?: string): string {
    if (!date) return '';
    const d = new Date(date);

    // Get local year, month, day
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  submit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const dto = this.form.value;

    if (this.bookId) {
      this.bookService.update(this.bookId, dto)
        .subscribe(() => this.router.navigate(['/books']));
    }
    else {
      this.bookService.create(dto)
        .subscribe(() => this.router.navigate(['/books']));
    }
  }
}
