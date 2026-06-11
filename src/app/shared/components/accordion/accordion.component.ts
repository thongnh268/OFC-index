import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  forwardRef,
  inject,
  input,
  signal,
} from '@angular/core';

import { IconComponent } from '../icon/icon.component';

// Parent and item live in one file: the item injects the parent while the parent
// queries the items — separate files would create a circular import. The item is
// declared first because the parent's compiled query references it in a static
// initializer; the item only references the parent lazily (forwardRef + inject).
@Component({
  selector: 'app-accordion-item',
  standalone: true,
  imports: [IconComponent],
  template: `
    <h3 class="accordion-heading">
      <button
        class="accordion-trigger"
        type="button"
        [id]="baseId() + '-trigger'"
        [attr.aria-expanded]="open()"
        [attr.aria-controls]="baseId() + '-panel'"
        (click)="toggle()"
      >
        <span>{{ heading() }}</span>
        <app-icon
          name="chevronDown"
          [size]="20"
          class="accordion-chevron"
          [class.is-open]="open()"
        />
      </button>
    </h3>
    <div
      class="accordion-panel"
      role="region"
      [id]="baseId() + '-panel'"
      [attr.aria-labelledby]="baseId() + '-trigger'"
      [class.is-open]="open()"
    >
      <div class="accordion-body"><ng-content /></div>
    </div>
  `,
  styleUrl: './accordion.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionItemComponent {
  readonly heading = input.required<string>();
  readonly open = signal(false);

  private readonly accordion = inject(
    forwardRef(() => AccordionComponent),
    { optional: true },
  );

  protected readonly baseId = computed(() => {
    const prefix = this.accordion?.accordionId() ?? 'accordion';
    const index = this.accordion?.items().indexOf(this) ?? 0;

    return `${prefix}-${index}`;
  });

  protected toggle(): void {
    const next = !this.open();

    if (next) {
      this.accordion?.closeOthers(this);
    }

    this.open.set(next);
  }
}

@Component({
  selector: 'app-accordion',
  standalone: true,
  template: `<ng-content />`,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent {
  /** Unique per page when several accordions coexist — prefixes the item ids. */
  readonly accordionId = input<string>('accordion');
  /** When false (default) opening an item closes its siblings. */
  readonly multi = input<boolean>(false);

  readonly items = contentChildren(AccordionItemComponent);

  closeOthers(except: AccordionItemComponent): void {
    if (this.multi()) {
      return;
    }

    for (const item of this.items()) {
      if (item !== except) {
        item.open.set(false);
      }
    }
  }
}
