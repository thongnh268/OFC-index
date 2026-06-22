import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { CarouselComponent } from '../../../shared/components/carousel/carousel.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import type { PostCard } from '../../../core/posts';
import type { NewsContent } from '../home-content.model';

// "News & updates" (Figma node 5:270): green eyebrow + tagline, a featured row with a
// view-all link, then a carousel of post cards. Section chrome is code-owned; the
// posts come from Sanity (the container fetches and passes them in).
@Component({
  selector: 'app-news-section',
  standalone: true,
  imports: [DatePipe, RouterLink, CarouselComponent, IconComponent],
  templateUrl: './news-section.component.html',
  styleUrl: './news-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsSectionComponent {
  readonly content = input.required<NewsContent>();
  readonly posts = input.required<readonly PostCard[]>();
}
