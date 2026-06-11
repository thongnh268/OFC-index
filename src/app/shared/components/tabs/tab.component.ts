import { ChangeDetectionStrategy, Component, TemplateRef, input, viewChild } from '@angular/core';

// Declares one tab inside <app-tab-group>; the group renders the active tab's template.
@Component({
  selector: 'app-tab',
  standalone: true,
  template: `<ng-template #content><ng-content /></ng-template>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent {
  readonly label = input.required<string>();
  readonly content = viewChild.required<TemplateRef<unknown>>('content');
}
