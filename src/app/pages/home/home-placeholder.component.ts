import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home-placeholder',
  standalone: true,
  template: `
    <section class="grid min-h-[360px] place-items-center px-4 py-16">
      <h1 class="text-center text-3xl font-bold text-primary md:text-4xl" i18n="@@home.comingSoon">
        Home page &mdash; coming soon
      </h1>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePlaceholderComponent {}
