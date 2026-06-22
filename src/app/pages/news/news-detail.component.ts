import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

import type { PostDetail } from '../../core/posts';
import { ArticleLayoutComponent } from '../../shared/components/article-layout/article-layout.component';
import type { BreadcrumbItem } from '../../shared/components/breadcrumb/breadcrumb.component';
import { PortableTextComponent } from '../../shared/components/portable-text/portable-text.component';

// /news/:slug article page. The post signal is undefined while loading, null when the slug
// matches nothing (renders a not-found view), or the post once resolved. Original OFC posts
// render Portable Text `body`; aggregated news (SBP/FSC) renders sanitized `bodyHtml`.
@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [DatePipe, RouterLink, ArticleLayoutComponent, PortableTextComponent],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsDetailComponent {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  private readonly homeLabel = $localize`:@@common.home:Home`;
  private readonly newsLabel = $localize`:@@nav.news:News`;
  protected readonly notFoundTitle = $localize`:@@news.notFoundTitle:Post not found`;

  // Resolved by the route (app.routes.ts): the post is loaded before activation so the page
  // renders immediately and scroll restoration on back/forward lands correctly.
  protected readonly post = toSignal(
    inject(ActivatedRoute).data.pipe(map((d) => (d['post'] ?? null) as PostDetail | null)),
    { initialValue: undefined },
  );

  protected readonly crumbs = computed<BreadcrumbItem[]>(() => {
    const base: BreadcrumbItem[] = [
      { label: this.homeLabel, route: '/' },
      { label: this.newsLabel, route: '/news' },
    ];
    const post = this.post();
    return post ? [...base, { label: post.title }] : base;
  });

  constructor() {
    effect(() => {
      const post = this.post();
      if (!post) {
        return;
      }
      this.title.setTitle(`${post.title} - OFC`);
      if (post.excerpt) {
        this.meta.updateTag({ name: 'description', content: post.excerpt });
      }
    });
  }
}
