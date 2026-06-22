import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LayoutComponent } from './layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
