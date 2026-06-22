import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import type { ComponentFixture } from '@angular/core/testing';

import { ProductsSectionComponent } from './products-section.component';
import { parseEmphasis } from '../../../shared/components/text-segments/text-segments.component';
import type { ProductsContent } from '../home-content.model';

const PRODUCTS: ProductsContent = {
  eyebrow: 'Products & Services',
  heading: 'High-quality wood products',
  body: parseEmphasis('OFC supplies <b>wood chips</b>'),
  items: [
    {
      title: 'Wood chips export',
      description: 'Wood chips for pulp.',
      imageUrl: 'https://cdn/chips.jpg',
      route: '/products/wood-chips-export',
    },
    {
      title: 'Afforestation',
      description: 'Forest planting.',
      imageUrl: null,
      route: '/products/afforestation',
    },
  ],
};

@Component({
  standalone: true,
  imports: [ProductsSectionComponent],
  template: `<app-products-section [content]="content()" />`,
})
class HostComponent {
  readonly content = signal<ProductsContent>(PRODUCTS);
}

describe('ProductsSectionComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    host = fixture.nativeElement as HTMLElement;
  });

  it('renders the section head with emphasised body', () => {
    expect(host.querySelector('.section-eyebrow')?.textContent).toContain('Products & Services');
    expect(host.querySelector('.section-body .tone-strong')?.textContent).toContain('wood chips');
  });

  it('renders one card per item with title, description and Learn more link', () => {
    const cards = host.querySelectorAll('.product-card');
    expect(cards.length).toBe(2);
    expect(cards[0].querySelector('.product-title')?.textContent).toContain('Wood chips export');
    expect(cards[0].querySelector('.product-desc')?.textContent).toContain('Wood chips for pulp.');
    expect(cards[0].querySelector<HTMLAnchorElement>('.product-link')?.getAttribute('href')).toBe(
      '/products/wood-chips-export',
    );
  });

  it('shows the photo when set and a neutral placeholder when missing', () => {
    const cards = host.querySelectorAll('.product-card');
    expect(cards[0].querySelector('img.product-image')?.getAttribute('src')).toBe(
      'https://cdn/chips.jpg',
    );
    expect(cards[1].querySelector('img.product-image')).toBeNull();
    expect(cards[1].querySelector('.product-image-placeholder')).toBeTruthy();
  });
});
