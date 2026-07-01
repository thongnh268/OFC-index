import { ChangeDetectionStrategy, Component, inject, LOCALE_ID } from '@angular/core';

import { type BreadcrumbItem } from '../../shared/components/breadcrumb/breadcrumb.component';
import { CompanySloganComponent } from '../../shared/components/company-slogan/company-slogan.component';
import { InnerContentComponent } from '../../shared/components/inner-content/inner-content.component';
import { InnerPageComponent } from '../../shared/components/inner-page/inner-page.component';
import { socialActivitiesContent } from './social-activities-content.data';

@Component({
  selector: 'app-social-activities-page',
  standalone: true,
  imports: [InnerPageComponent, InnerContentComponent, CompanySloganComponent],
  templateUrl: './social-activities.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialActivitiesComponent {
  protected readonly content = socialActivitiesContent(inject(LOCALE_ID));

  protected readonly breadcrumb: readonly BreadcrumbItem[] = [
    { label: this.content.breadcrumbHome, route: '/' },
    { label: this.content.title },
  ];
}
