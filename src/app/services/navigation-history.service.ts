import { Injectable } from '@angular/core';
import { Router, NavigationEnd, NavigationExtras } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class NavigationHistoryService {
  private history: string[] = [];
  private maxHistoryLength = 10; // Evitar crecimiento excesivo de memoria

  constructor(private router: Router) {
    this.setupHistoryTracking();
  }

  private setupHistoryTracking(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Evitar duplicados consecutivos
        if (this.history[this.history.length - 1] !== event.urlAfterRedirects) {
          this.history.push(event.urlAfterRedirects);
          
          // Mantener un tamaño máximo
          if (this.history.length > this.maxHistoryLength) {
            this.history.shift();
          }
        }
      });
  }

  navigateWithReturnUrl(commands: any[], extras: NavigationExtras = {}): Promise<boolean> {
    const navigationExtras: NavigationExtras = {
      ...extras,
      state: {
        ...(extras.state || {}),
        returnUrl: this.currentUrl
      }
    };
    
    return this.router.navigate(commands, navigationExtras);
  }

  back(defaultUrl: string = '/'): Promise<boolean> {
    const previousUrl = this.previousUrl;
    
    if (previousUrl && previousUrl !== this.currentUrl) {
      return this.router.navigateByUrl(previousUrl);
    }
    
    return this.router.navigate([defaultUrl]);
  }

  get currentUrl(): string {
    return this.router.url;
  }

  get previousUrl(): string | null {
    return this.history.length > 1 ? this.history[this.history.length - 2] : null;
  }

  getHistory(): string[] {
    return [...this.history];
  }
}
