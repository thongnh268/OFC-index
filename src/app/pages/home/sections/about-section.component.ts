import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import type { SafeResourceUrl } from '@angular/platform-browser';

import { SectionHeadComponent } from '../../../shared/components/section-head/section-head.component';
import { TextSegmentsComponent } from '../../../shared/components/text-segments/text-segments.component';
import type { AboutContent } from '../home-content.model';

// "About OFC Company" section (Figma node 2:281): intro on top, then a two-column row -
// an intro video on the left, the business/export/subsidiaries blocks on the right.
// Content comes from the HomeContent boundary; layout and chrome are code-owned.
@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [SectionHeadComponent, TextSegmentsComponent],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutSectionComponent {
  private readonly sanitizer = inject(DomSanitizer);

  readonly content = input.required<AboutContent>();

  // iframe[src] needs a trusted resource URL; null hides the embed for a neutral placeholder.
  protected readonly safeVideoUrl = computed<SafeResourceUrl | null>(() => {
    const url = this.content().videoUrl;
    return url ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : null;
  });
}
