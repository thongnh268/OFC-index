import { ChangeDetectionStrategy, Component, inject, LOCALE_ID } from '@angular/core';

import { type BreadcrumbItem } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { CompanySloganComponent } from '../../../shared/components/company-slogan/company-slogan.component';
import { InnerContentComponent } from '../../../shared/components/inner-content/inner-content.component';
import { InnerPageComponent } from '../../../shared/components/inner-page/inner-page.component';
import { introductionContent } from './introduction-content.data';

@Component({
  selector: 'app-introduction-page',
  standalone: true,
  imports: [InnerPageComponent, InnerContentComponent, CompanySloganComponent],
  templateUrl: './introduction.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroductionComponent {
  protected readonly content = introductionContent(inject(LOCALE_ID));

  protected readonly breadcrumb: readonly BreadcrumbItem[] = [
    { label: this.content.breadcrumbHome, route: '/' },
    { label: this.content.breadcrumbAbout },
    { label: this.content.title },
  ];
}
