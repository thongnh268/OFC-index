import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { SanityService } from '../../core/sanity';
import { HOME_CONTENT_PLACEHOLDER } from './home-content.placeholder';
import { HomeContentService } from './home-content.service';
import type { HeadingSegment, HeroStat, HomeContent } from './home-content.model';

describe('HomeContentService', () => {
  let service: HomeContentService;
  let fetchSpy: jasmine.Spy;

  const setup = (): void => {
    fetchSpy = jasmine.createSpy('fetch');
    TestBed.configureTestingModule({
      providers: [{ provide: SanityService, useValue: { fetch: fetchSpy } }],
    });
    service = TestBed.inject(HomeContentService);
  };

  const latest = (): HomeContent => {
    let value!: HomeContent;
    service.getContent().subscribe((content) => (value = content));
    return value;
  };

  beforeEach(setup);

  it('uses CMS hero text when present', () => {
    const heading: HeadingSegment[] = [{ tone: 'accent', text: 'Hàng đầu' }];
    fetchSpy.and.returnValue(
      of({ hero: { heading, subheading: 'Bền vững', imageUrl: 'https://cdn/x.jpg' } }),
    );

    const hero = latest().hero;
    expect(hero.heading).toEqual(heading);
    expect(hero.subheading).toBe('Bền vững');
    expect(hero.imageUrl).toBe('https://cdn/x.jpg');
  });

  it('falls back to the placeholder when the homepage document is missing (null)', () => {
    fetchSpy.and.returnValue(of(null));
    expect(latest()).toEqual(HOME_CONTENT_PLACEHOLDER);
  });

  it('fills only the missing hero fields from the placeholder', () => {
    const heading: HeadingSegment[] = [{ tone: 'navy', text: 'Only heading' }];
    fetchSpy.and.returnValue(of({ hero: { heading, subheading: null, imageUrl: null } }));

    const hero = latest().hero;
    expect(hero.heading).toEqual(heading);
    expect(hero.subheading).toBe(HOME_CONTENT_PLACEHOLDER.hero.subheading);
    expect(hero.imageUrl).toBe(HOME_CONTENT_PLACEHOLDER.hero.imageUrl);
  });

  it('keeps placeholder for sections with no CMS field yet (about, figures, cta)', () => {
    fetchSpy.and.returnValue(of({ hero: { heading: 'x', subheading: 'y', imageUrl: null } }));

    const content = latest();
    expect(content.about).toEqual(HOME_CONTENT_PLACEHOLDER.about);
    expect(content.figures).toEqual(HOME_CONTENT_PLACEHOLDER.figures);
    expect(content.cta).toEqual(HOME_CONTENT_PLACEHOLDER.cta);
  });

  it('uses CMS hero stats when the array is non-empty', () => {
    const stats: HeroStat[] = [{ icon: 'people', lines: [{ text: '900+', style: 'value' }] }];
    fetchSpy.and.returnValue(
      of({ hero: { heading: 'x', subheading: 'y', imageUrl: null, stats } }),
    );

    expect(latest().hero.stats).toEqual(stats);
  });

  it('keeps placeholder hero stats when the CMS array is empty or absent', () => {
    fetchSpy.and.returnValue(
      of({ hero: { heading: 'x', subheading: 'y', imageUrl: null, stats: [] } }),
    );
    expect(latest().hero.stats).toEqual(HOME_CONTENT_PLACEHOLDER.hero.stats);
  });

  it('falls back to the placeholder when the query errors', () => {
    fetchSpy.and.returnValue(throwError(() => new Error('network')));
    expect(latest()).toEqual(HOME_CONTENT_PLACEHOLDER);
  });
});
