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
        <label class="sr-only" [attr.for]="inputId()">Email address</label>
        <input
          [id]="inputId()"
          #emailInput
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          required
        />
        <button type="submit">Send</button>
      </div>
    </form>
  `,
  styleUrl: './subscription-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionFormComponent {
  readonly heading = input<string>('Subscription');
  readonly inputId = input.required<string>();
  readonly submitted = output<string>();

  private readonly emailInput = viewChild.required<ElementRef<HTMLInputElement>>('emailInput');

  protected onSubmit(event: Event): void {
    event.preventDefault();
    this.submitted.emit(this.emailInput().nativeElement.value);
  }
}
