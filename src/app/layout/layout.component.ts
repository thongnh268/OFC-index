import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ScrollToTopComponent } from '../shared/components/scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent, ScrollToTopComponent],
  template: `
    <app-header />
    <main class="section-min">
      <router-outlet />
    </main>
    <app-footer />
    <app-scroll-to-top />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
