import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';

import { IconComponent } from '../icon/icon.component';

// Centered modal. Same declarative contract as app-mobile-drawer ([open]/(closed));
// focus trapping + restore delegated to CDK cdkTrapFocus.
@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [A11yModule, IconComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  readonly open = input<boolean>(false);
  readonly heading = input<string>('');
  /** Unique per page when several dialogs coexist - prefixes the title id. */
  readonly dialogId = input<string>('dialog');
  readonly closed = output<void>();
}
