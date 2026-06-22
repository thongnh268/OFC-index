import { LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { SANITY_CONFIG } from './config';
import { SanityService } from './sanity.service';

const QUERY_URL =
  `https://${SANITY_CONFIG.projectId}.apicdn.sanity.io` +
  `/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}`;

describe('SanityService', () => {
  let service: SanityService;
  let httpMock: HttpTestingController;

  const setup = (locale: string): void => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: LOCALE_ID, useValue: locale },
      ],
    });
    service = TestBed.inject(SanityService);
    httpMock = TestBed.inject(HttpTestingController);
  };

  afterEach(() => httpMock.verify());

  it('GETs the CDN query endpoint with the GROQ string and published perspective', () => {
    setup('en-US');
    service.fetch('*[_type == "post"]').subscribe();

    const request = httpMock.expectOne((req) => req.url === QUERY_URL);
    expect(request.request.method).toBe('GET');
    expect(request.request.params.get('query')).toBe('*[_type == "post"]');
    expect(request.request.params.get('perspective')).toBe('published');
    request.flush({ result: [] });
  });

  it('binds $locale from LOCALE_ID (en build)', () => {
    setup('en-US');
    service.fetch('*').subscribe();

    const request = httpMock.expectOne((req) => req.url === QUERY_URL);
    expect(request.request.params.get('$locale')).toBe('"en"');
    request.flush({ result: null });
  });

  it('binds $locale from LOCALE_ID (vi build)', () => {
    setup('vi');
    service.fetch('*').subscribe();

    const request = httpMock.expectOne((req) => req.url === QUERY_URL);
    expect(request.request.params.get('$locale')).toBe('"vi"');
    request.flush({ result: null });
  });

  it('JSON-encodes extra params under $name and lets them override $locale', () => {
    setup('en-US');
    service.fetch('*', { slug: 'go-pellets', limit: 5, locale: 'vi' }).subscribe();

    const request = httpMock.expectOne((req) => req.url === QUERY_URL);
    expect(request.request.params.get('$slug')).toBe('"go-pellets"');
    expect(request.request.params.get('$limit')).toBe('5');
    expect(request.request.params.get('$locale')).toBe('"vi"');
    request.flush({ result: null });
  });

  it('unwraps the result envelope', () => {
    setup('en-US');
    const posts = [{ _id: 'a' }, { _id: 'b' }];
    let received: unknown;

    service.fetch('*').subscribe((value) => (received = value));
    httpMock.expectOne((req) => req.url === QUERY_URL).flush({ result: posts });

    expect(received).toEqual(posts);
  });

  it('propagates HTTP errors to the subscriber', () => {
    setup('en-US');
    let status = 0;

    service.fetch('*').subscribe({ error: (error) => (status = error.status) });
    httpMock
      .expectOne((req) => req.url === QUERY_URL)
      .flush({ message: 'bad query' }, { status: 400, statusText: 'Bad Request' });

    expect(status).toBe(400);
  });
});
