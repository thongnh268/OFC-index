import { Directive, computed, input } from '@angular/core';

// Style carrier for native buttons/anchors — keeps form semantics and routerLink intact.
// Visuals live in src/styles.css (`.btn*`, @layer components).
@Directive({
  selector: 'button[appButton], a[appButton]',
  standalone: true,
  host: { '[class]': 'hostClasses()' },
})
export class ButtonDirective {
  readonly variant = input<'primary' | 'outline' | 'ghost'>('primary');
  readonly size = input<'md' | 'sm'>('md');

  protected readonly hostClasses = computed(
    () => `btn btn-${this.variant()}${this.size() === 'sm' ? ' btn-sm' : ''}`,
  );
}
