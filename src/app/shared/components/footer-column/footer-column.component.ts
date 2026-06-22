import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

@Component({
  selector: 'app-footer-column',
  standalone: true,
  template: `
    <div class="footer-column">
      <h2>{{ heading() }}</h2>
      <ng-content />
    </div>
  `,
  styleUrl: './footer-column.component.css',
  // The component owns projected nav/link/paragraph styles, so use narrow global selectors.
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterColumnComponent {
  readonly heading = input.required<string>();
}
