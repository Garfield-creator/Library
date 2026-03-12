import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private storageKey = 'theme';

  initTheme() {
    const savedTheme = localStorage.getItem(this.storageKey);

    if (savedTheme) {
      this.setTheme(savedTheme as 'light' | 'dark');
      return;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.setTheme(prefersDark ? 'dark' : 'light');
  }

  setTheme(theme: 'light' | 'dark') {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem(this.storageKey, theme);
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-bs-theme');

    if (current === 'dark') {
      this.setTheme('light');
    } else {
      this.setTheme('dark');
    }
  }

  isDarkTheme() : boolean {
    const savedTheme = localStorage.getItem(this.storageKey);
    return savedTheme === 'dark';
  }
}
