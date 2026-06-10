import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-subscription-form',
  standalone: true,
  template: `
    <form class="subscription" (submit)="onSubmit($event)">
      <h2 class="text-2xl font-bold text-primary">{{ heading() }}</h2>
      <div class="mt-6 flex gap-3">
        <label class="sr-only" [attr.for]="inputId()" i18n="@@subscription.emailLabel"
          >Email address</label
        >
        <input
          [id]="inputId()"
          #emailInput
          type="email"
          placeholder="Email address"
          i18n-placeholder="@@subscription.emailPlaceholder"
          aria-label="Email address"
          i18n-aria-label="@@subscription.emailLabel"
          required
        />
        <button type="submit" i18n="@@subscription.send">Send</button>
      </div>
    </form>
  `,
  styleUrl: './subscription-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionFormComponent {
  readonly heading = input<string>($localize`:@@subscription.heading:Subscription`);
  readonly inputId = input.required<string>();
  readonly submitted = output<string>();

  private readonly emailInput = viewChild.required<ElementRef<HTMLInputElement>>('emailInput');

  protected onSubmit(event: Event): void {
    event.preventDefault();
    this.submitted.emit(this.emailInput().nativeElement.value);
  }
}
