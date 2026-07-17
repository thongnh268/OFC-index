import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';

import { ProductGalleryComponent } from './product-gallery.component';
import type { ProductGalleryImage } from './product-content.model';

@Component({
  standalone: true,
  imports: [ProductGalleryComponent],
  template: `<app-product-gallery [images]="images" />`,
})
class HostComponent {
  readonly images: readonly ProductGalleryImage[] = [
    { src: 'assets/images/products/first.png', alt: 'First product image' },
    { src: 'assets/images/products/second.png', alt: 'Second product image' },
  ];
}

describe('ProductGalleryComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    host = fixture.nativeElement as HTMLElement;
  });

  it('renders gallery images as dialog buttons', () => {
    const buttons = host.querySelectorAll<HTMLButtonElement>('.gallery__button');

    expect(buttons.length).toBe(2);
    expect(buttons[0].getAttribute('aria-haspopup')).toBe('dialog');
  });

  it('opens and navigates the shared image viewer', () => {
    (host.querySelector('.gallery__button') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(host.querySelector('.dialog-panel')?.getAttribute('aria-modal')).toBe('true');
    expect(host.querySelector('.viewer-preview__image')?.getAttribute('src')).toContain(
      'first.png',
    );
    expect(host.querySelector('.viewer-counter')?.textContent).toContain('1 / 2');

    (host.querySelector('.viewer-nav--next') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(host.querySelector('.viewer-preview__image')?.getAttribute('src')).toContain(
      'second.png',
    );
    expect(host.querySelector('.viewer-counter')?.textContent).toContain('2 / 2');
  });
});
