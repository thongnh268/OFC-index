import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter, startWith, switchMap } from 'rxjs/operators';
import { SiteSettingsService } from './core/settings';
import { LayoutComponent } from './layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly router = inject(Router);
  private readonly settings = inject(SiteSettingsService);
  private readonly title = inject(Title);

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        startWith(null),
        switchMap(() => this.settings.getSiteTitle()),
        takeUntilDestroyed(),
      )
      .subscribe((siteTitle) => {
        if (!this.router.url.startsWith('/news/')) {
          this.title.setTitle(siteTitle);
        }
      });
  }
}
