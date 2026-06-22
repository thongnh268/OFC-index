import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { SanityService } from './core/sanity';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      // Footer pulls company facts via SiteSettingsService → SanityService; stub the fetch
      // so the shell renders from code-owned defaults without any HTTP.
      providers: [
        provideRouter(routes),
        { provide: SanityService, useValue: { fetch: () => of(null) } },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the layout shell', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-layout')).toBeTruthy();
  });
});
