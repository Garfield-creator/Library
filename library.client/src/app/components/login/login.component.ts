import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  form!: FormGroup;
  error: string | null = null;
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  submit(): void {
    this.error = null;
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    const { username, password } = this.form.value;

    this.authService.login(username, password).subscribe({
      next: () => {
        this.router.navigate(['/books']);
        this.changeDetector.detectChanges();
      },
      error: err => {
        this.loading = false;
        if (err.status === 401) {
          this.error = 'Ogiltit användarnamn eller lösenord.';
        } else if (err.status === 0) {
          this.error = 'Kan inte nå servern. Undersök din internetanslutning.';
        } else {
          this.error = 'Ett oväntat fel inträffade. Försök igen senare';
        }
        console.error('Login error', err);
        this.changeDetector.detectChanges();
      }
    });
  }
}

