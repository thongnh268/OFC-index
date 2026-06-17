import { ChangeDetectionStrategy, Component, inject, LOCALE_ID } from '@angular/core';

import { type BreadcrumbItem } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { CertificateGridComponent } from '../../../shared/components/certificate-grid/certificate-grid.component';
import { InnerContentComponent } from '../../../shared/components/inner-content/inner-content.component';
import { InnerPageComponent } from '../../../shared/components/inner-page/inner-page.component';
import { qualityContent } from './quality-content.data';

@Component({
  selector: 'app-quality-page',
  standalone: true,
  imports: [InnerPageComponent, InnerContentComponent, CertificateGridComponent],
  templateUrl: './quality.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QualityComponent {
  protected readonly content = qualityContent(inject(LOCALE_ID));

  protected readonly breadcrumb: readonly BreadcrumbItem[] = [
    { label: this.content.breadcrumbHome, route: '/' },
    { label: this.content.breadcrumbAbout },
    { label: this.content.title },
  ];
}
