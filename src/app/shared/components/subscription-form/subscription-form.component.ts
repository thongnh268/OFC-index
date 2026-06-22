import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  viewChild,
} from '@angular/core';
import { ButtonDirective } from '../../directives/button.directive';
import { FieldDirective } from '../../directives/field.directive';

@Component({
  selector: 'app-subscription-form',
  standalone: true,
  imports: [ButtonDirective, FieldDirective],
  template: `
    <form class="subscription" (submit)="onSubmit($event)">
      <h2 class="subscription-heading">{{ heading() }}</h2>
      <p class="subscription-description">{{ description() }}</p>
      <div class="subscription-fields">
        <label class="sr-only" [attr.for]="inputId()" i18n="@@subscription.emailLabel"
          >Email address</label
        >
        <input
          [id]="inputId()"
          #emailInput
          type="email"
          appField
          placeholder="Enter your email here"
          i18n-placeholder="@@subscription.emailPlaceholder"
          aria-label="Email address"
          i18n-aria-label="@@subscription.emailLabel"
          required
        />
        <button type="submit" appButton variant="accent" i18n="@@subscription.send">Send</button>
      </div>
    </form>
  `,
  styleUrl: './subscription-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionFormComponent {
  readonly heading = input<string>($localize`:@@subscription.heading:NEWSLETTER SUBSCRIPTION`);
  readonly description = input<string>(
    $localize`:@@subscription.description:Stay updated with our latest news & insights`,
  );
  readonly inputId = input.required<string>();
  readonly submitted = output<string>();

  private readonly emailInput = viewChild.required<ElementRef<HTMLInputElement>>('emailInput');

  protected onSubmit(event: Event): void {
    event.preventDefault();
    this.submitted.emit(this.emailInput().nativeElement.value);
  }
}
