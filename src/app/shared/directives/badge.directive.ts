import { Directive, computed, input } from '@angular/core';

// Style carrier for inline labels (categories, statuses). Visuals in src/styles.css.
@Directive({
  selector: '[appBadge]',
  standalone: true,
  host: { '[class]': 'hostClasses()' },
})
export class BadgeDirective {
  readonly variant = input<'primary' | 'accent' | 'neutral'>('primary');

  protected readonly hostClasses = computed(() => `badge badge-${this.variant()}`);
}
