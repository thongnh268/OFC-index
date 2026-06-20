import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import type { ComponentFixture } from '@angular/core/testing';

import { NewsSectionComponent } from './news-section.component';
import type { PostCard } from '../../../core/posts';
import type { NewsContent } from '../home-content.model';

const NEWS: NewsContent = {
  eyebrow: 'News and updates',
  tagline: 'Stay informed with the latest from OFC Company',
  featuredLabel: 'Featured news',
  viewAllLabel: 'View all news',
};

const POSTS: PostCard[] = [
  {
    slug: 'timber-processing-art',
    title: 'Timber Processing - The art of sustainable utilization',
    imageUrl: 'https://cdn/timber.jpg',
    publishedAt: '2026-06-08T00:00:00Z',
  },
  {
    slug: 'wood-pellets-solution',
    title: 'Wood pellets - A convenient and sustainable solution',
    imageUrl: null,
    publishedAt: '2026-06-04T00:00:00Z',
  },
];

@Component({
  standalone: true,
  imports: [NewsSectionComponent],
  template: `<app-news-section [content]="content()" [posts]="posts()" />`,
})
class HostComponent {
  readonly content = signal<NewsContent>(NEWS);
  readonly posts = signal<PostCard[]>(POSTS);
}

describe('NewsSectionComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    host = fixture.nativeElement as HTMLElement;
  });

  it('renders the eyebrow, tagline, featured label and view-all link', () => {
    expect(host.querySelector('.news-eyebrow')?.textContent).toContain('News and updates');
    expect(host.querySelector('.news-tagline')?.textContent).toContain('Stay informed');
    expect(host.querySelector('.news-featured')?.textContent).toContain('Featured news');
    expect(host.querySelector<HTMLAnchorElement>('.news-viewall')?.getAttribute('href')).toBe(
      '/news',
    );
  });

  it('renders one card per post linking to its detail page', () => {
    const links = host.querySelectorAll<HTMLAnchorElement>('.news-card-link');
    expect(links.length).toBe(2);
    expect(links[0].getAttribute('href')).toBe('/news/timber-processing-art');
    expect(links[0].querySelector('.news-title')?.textContent).toContain('Timber Processing');
  });

  it('formats the published date as dd/MM/yyyy next to View details', () => {
    const meta = host.querySelector('.news-meta')?.textContent?.replace(/\s+/g, ' ');
    expect(meta).toContain('View details');
    expect(meta).toContain('08/06/2026');
  });

  it('shows the cover when set and a neutral placeholder when missing', () => {
    const cards = host.querySelectorAll('.news-card');
    expect(cards[0].querySelector('img.news-image')?.getAttribute('src')).toBe(
      'https://cdn/timber.jpg',
    );
    expect(cards[1].querySelector('img.news-image')).toBeNull();
    expect(cards[1].querySelector('.news-image-placeholder')).toBeTruthy();
  });
});
