import { ChangeDetectionStrategy, Component, inject, LOCALE_ID } from '@angular/core';

import { type BreadcrumbItem } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { CompanySloganComponent } from '../../../shared/components/company-slogan/company-slogan.component';
import { InnerContentComponent } from '../../../shared/components/inner-content/inner-content.component';
import { InnerPageComponent } from '../../../shared/components/inner-page/inner-page.component';
import { introduceContent } from './introduce-content.data';

@Component({
  selector: 'app-introduce-page',
  standalone: true,
  imports: [InnerPageComponent, InnerContentComponent, CompanySloganComponent],
  templateUrl: './introduce.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroduceComponent {
  protected readonly content = introduceContent(inject(LOCALE_ID));

  protected readonly breadcrumb: readonly BreadcrumbItem[] = [
    { label: this.content.breadcrumbHome, route: '/' },
    { label: this.content.breadcrumbAbout },
    { label: this.content.title },
  ];
}
