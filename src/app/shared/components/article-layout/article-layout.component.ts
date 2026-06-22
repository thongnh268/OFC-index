import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { BreadcrumbComponent, type BreadcrumbItem } from '../breadcrumb/breadcrumb.component';

// Reusable article shell for post-like detail pages. It owns the page spacing, centered reading
// column, breadcrumb and H1; callers project page-specific meta, cover and body content.
@Component({
  selector: 'app-article-layout',
  standalone: true,
  imports: [BreadcrumbComponent],
  templateUrl: './article-layout.component.html',
  styleUrl: './article-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleLayoutComponent {
  readonly breadcrumb = input.required<readonly BreadcrumbItem[]>();
  readonly title = input.required<string>();
}
