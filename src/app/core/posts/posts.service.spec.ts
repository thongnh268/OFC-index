import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import type { Observable } from 'rxjs';

import { SanityService } from '../sanity';
import { PostsService } from './posts.service';
import type { PostCard, PostDetail, PostListItem } from './posts.service';

describe('PostsService', () => {
  let service: PostsService;
  let fetchSpy: jasmine.Spy;

  beforeEach(() => {
    fetchSpy = jasmine.createSpy('fetch');
    TestBed.configureTestingModule({
      providers: [{ provide: SanityService, useValue: { fetch: fetchSpy } }],
    });
    service = TestBed.inject(PostsService);
  });

  const firstValue = <T>(obs: Observable<T>): T => {
    let value!: T;
    obs.subscribe((v) => (value = v));
    return value;
  };

  describe('getLatest', () => {
    it('maps cards and drops half-filled drafts', () => {
      fetchSpy.and.returnValue(
        of([
          { slug: 'a', title: 'A', imageUrl: 'i', publishedAt: '2026-01-01' },
          { slug: null, title: 'no slug', imageUrl: null, publishedAt: '2026-01-02' },
        ]),
      );
      expect(firstValue<PostCard[]>(service.getLatest())).toEqual([
        { slug: 'a', title: 'A', imageUrl: 'i', publishedAt: '2026-01-01' },
      ]);
    });

    it('resolves to [] on error', () => {
      fetchSpy.and.returnValue(throwError(() => new Error('network')));
      expect(firstValue<PostCard[]>(service.getLatest())).toEqual([]);
    });
  });

  describe('getAll', () => {
    it('maps every post with list-card fields', () => {
      fetchSpy.and.returnValue(
        of([
          {
            _id: '1',
            slug: 'a',
            title: 'A',
            excerpt: 'ex',
            imageUrl: 'i',
            publishedAt: '2026-01-02',
            author: 'Jane',
            source: 'SBP',
          },
        ]),
      );
      expect(firstValue<PostListItem[]>(service.getAll())).toEqual([
        {
          slug: 'a',
          title: 'A',
          excerpt: 'ex',
          imageUrl: 'i',
          publishedAt: '2026-01-02',
          author: 'Jane',
          source: 'SBP',
        },
      ]);
    });

    it('drops posts missing slug/title/publishedAt and keeps null optionals', () => {
      fetchSpy.and.returnValue(
        of([
          {
            _id: '1',
            slug: 'a',
            title: 'A',
            excerpt: null,
            imageUrl: null,
            publishedAt: '2026-01-01',
            author: null,
          },
          {
            _id: '2',
            slug: 'b',
            title: null,
            excerpt: null,
            imageUrl: null,
            publishedAt: '2026-01-01',
            author: null,
          },
        ]),
      );
      expect(firstValue<PostListItem[]>(service.getAll())).toEqual([
        {
          slug: 'a',
          title: 'A',
          excerpt: null,
          imageUrl: null,
          publishedAt: '2026-01-01',
          author: null,
          source: null,
        },
      ]);
    });

    it('resolves to [] on null and on error', () => {
      fetchSpy.and.returnValue(of(null));
      expect(firstValue<PostListItem[]>(service.getAll())).toEqual([]);
      fetchSpy.and.returnValue(throwError(() => new Error('x')));
      expect(firstValue<PostListItem[]>(service.getAll())).toEqual([]);
    });
  });

  describe('getBySlug', () => {
    it('passes the slug param and maps the post (incl. body)', () => {
      fetchSpy.and.returnValue(
        of({
          slug: 'a',
          title: 'A',
          excerpt: 'ex',
          imageUrl: 'i',
          imageAlt: 'alt',
          publishedAt: '2026-01-01',
          author: 'Jane',
          body: [{ _type: 'block', _key: 'k', style: 'normal', children: [] }],
        }),
      );
      const result = firstValue<PostDetail | null>(service.getBySlug('a'));
      expect(fetchSpy).toHaveBeenCalledWith(jasmine.any(String), { slug: 'a' });
      expect(result?.slug).toBe('a');
      expect(result?.imageAlt).toBe('alt');
      expect(result?.body.length).toBe(1);
    });

    it('maps aggregated-news fields (bodyHtml, source, sourceUrl)', () => {
      fetchSpy.and.returnValue(
        of({
          slug: 'sbp-x',
          title: 'X',
          publishedAt: '2026-01-01',
          body: null,
          bodyHtml: '<p>hello</p>',
          source: 'SBP',
          sourceUrl: 'https://sbp-cert.org/x/',
        }),
      );
      const result = firstValue<PostDetail | null>(service.getBySlug('sbp-x'));
      expect(result?.bodyHtml).toBe('<p>hello</p>');
      expect(result?.source).toBe('SBP');
      expect(result?.sourceUrl).toBe('https://sbp-cert.org/x/');
    });

    it('returns null when the post is missing', () => {
      fetchSpy.and.returnValue(of(null));
      expect(firstValue<PostDetail | null>(service.getBySlug('missing'))).toBeNull();
    });

    it('returns null when the post is incomplete (no title)', () => {
      fetchSpy.and.returnValue(of({ slug: 'a', title: null, publishedAt: '2026-01-01' }));
      expect(firstValue<PostDetail | null>(service.getBySlug('a'))).toBeNull();
    });

    it('defaults a missing body to []', () => {
      fetchSpy.and.returnValue(
        of({ slug: 'a', title: 'A', publishedAt: '2026-01-01', body: null }),
      );
      expect(firstValue<PostDetail | null>(service.getBySlug('a'))?.body).toEqual([]);
    });

    it('resolves to null on error', () => {
      fetchSpy.and.returnValue(throwError(() => new Error('x')));
      expect(firstValue<PostDetail | null>(service.getBySlug('a'))).toBeNull();
    });
  });
});
