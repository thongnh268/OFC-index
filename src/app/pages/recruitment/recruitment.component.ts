import { ChangeDetectionStrategy, Component, inject, LOCALE_ID } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { type BreadcrumbItem } from '../../shared/components/breadcrumb/breadcrumb.component';
import { InnerPageComponent } from '../../shared/components/inner-page/inner-page.component';
import {
  type SidebarCta,
  type SidebarSectionGroup,
} from '../../shared/components/inner-sidebar/inner-sidebar.component';
import { type QuoteCtaConfig } from '../../shared/components/quote-cta/quote-cta.component';
import { type JobPosition, recruitmentContent } from './recruitment-content.data';
import { RecruitmentPositionsComponent } from './recruitment-positions.component';

@Component({
  selector: 'app-recruitment-page',
  standalone: true,
  imports: [InnerPageComponent, RecruitmentPositionsComponent],
  templateUrl: './recruitment.component.html',
  styleUrl: './recruitment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecruitmentComponent {
  protected readonly content = recruitmentContent(inject(LOCALE_ID));
  // Jobs are resolved by the route (app.routes.ts) so the list is present before the router
  // restores scroll position on back/forward navigation.
  protected readonly positions = toSignal(
    inject(ActivatedRoute).data.pipe(map((d) => (d['jobs'] ?? []) as readonly JobPosition[])),
    { initialValue: [] as readonly JobPosition[] },
  );

  protected readonly breadcrumb: readonly BreadcrumbItem[] = [
    { label: this.content.breadcrumbHome, route: '/' },
    { label: this.content.breadcrumbTitle },
  ];

  protected readonly sidebarCta: SidebarCta = {
    label: this.content.applyNowLabel,
    route: '/contacts',
    icon: 'edit',
  };

  protected readonly pageSections: SidebarSectionGroup = {
    title: this.content.sidebarSectionsTitle,
    sections: [
      { id: 'open-positions', label: this.content.sectionOpenPositions },
      { id: 'application-documents', label: this.content.sectionApplicationDocuments },
      { id: 'contact-information', label: this.content.sectionContactInformation },
    ],
  };

  protected readonly ctaConfig: QuoteCtaConfig = {
    heading: this.content.ctaHeading,
    buttonLabel: this.content.ctaButtonLabel,
    buttonRoute: '/contacts',
    buttonIcon: 'chevronRight',
    variant: 'compact',
  };
}
