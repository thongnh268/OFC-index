import { ChangeDetectionStrategy, Component, inject, LOCALE_ID } from '@angular/core';

import { type BreadcrumbItem } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { InnerContentComponent } from '../../../shared/components/inner-content/inner-content.component';
import { InnerPageComponent } from '../../../shared/components/inner-page/inner-page.component';
import { boardContent } from './board-content.data';
import { OrgChartComponent } from './sections/org-chart.component';

@Component({
  selector: 'app-board-page',
  standalone: true,
  imports: [InnerPageComponent, InnerContentComponent, OrgChartComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent {
  protected readonly content = boardContent(inject(LOCALE_ID));

  protected readonly breadcrumb: readonly BreadcrumbItem[] = [
    { label: this.content.breadcrumbHome, route: '/' },
    { label: this.content.breadcrumbAbout },
    { label: this.content.title },
  ];
}
