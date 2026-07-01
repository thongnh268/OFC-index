import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, LOCALE_ID } from '@angular/core';

import { type BreadcrumbItem } from '../../shared/components/breadcrumb/breadcrumb.component';
import { InnerPageComponent } from '../../shared/components/inner-page/inner-page.component';
import {
  type SidebarCta,
  type SidebarSectionGroup,
} from '../../shared/components/inner-sidebar/inner-sidebar.component';
import { type QuoteCtaConfig } from '../../shared/components/quote-cta/quote-cta.component';
import { recruitmentContent } from './recruitment-content.data';
import { RecruitmentJobsService } from './recruitment-jobs.service';
import { RecruitmentPositionsComponent } from './recruitment-positions.component';

@Component({
  selector: 'app-recruitment-page',
  standalone: true,
  imports: [AsyncPipe, InnerPageComponent, RecruitmentPositionsComponent],
  templateUrl: './recruitment.component.html',
  styleUrl: './recruitment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecruitmentComponent {
  private readonly recruitmentJobs = inject(RecruitmentJobsService);
  protected readonly content = recruitmentContent(inject(LOCALE_ID));
  protected readonly positions$ = this.recruitmentJobs.getJobs();

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
