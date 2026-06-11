import { Directive, computed, input } from '@angular/core';

// Style carrier for surface containers. Visuals in src/styles.css (`.card*`).
@Directive({
  selector: '[appCard]',
  standalone: true,
  host: { '[class]': 'hostClasses()' },
})
export class CardDirective {
  /** Set false when the consumer manages its own inner padding (e.g. media cards). */
  readonly padded = input<boolean>(true);

  protected readonly hostClasses = computed(() => (this.padded() ? 'card card-padded' : 'card'));
}
