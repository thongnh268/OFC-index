import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';

import { CertificateGridComponent, type CertificateItem } from './certificate-grid.component';

@Component({
  standalone: true,
  imports: [CertificateGridComponent],
  template: `<app-certificate-grid [items]="items" />`,
})
class HostComponent {
  readonly items: readonly CertificateItem[] = [
    { title: 'FSC COC', thumbnailUrl: 'assets/images/certificates/FSC-COC.png' },
    { title: 'PEFC', thumbnailUrl: 'assets/images/certificates/PEFC.png' },
  ];
}

describe('CertificateGridComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    host = fixture.nativeElement as HTMLElement;
  });

  it('renders certificate thumbnails as dialog buttons', () => {
    const card = host.querySelector('.cert-card') as HTMLButtonElement;
    const thumb = host.querySelector('.cert-thumb') as HTMLImageElement;

    expect(card.type).toBe('button');
    expect(card.getAttribute('aria-haspopup')).toBe('dialog');
    expect(thumb.getAttribute('alt')).toBe('FSC COC');
  });

  it('opens, navigates, and closes the certificate gallery dialog', () => {
    const card = host.querySelector('.cert-card') as HTMLButtonElement;

    card.click();
    fixture.detectChanges();

    expect(host.querySelector('.dialog-panel')?.getAttribute('aria-modal')).toBe('true');
    expect(host.querySelector('.dialog-panel')?.classList).toContain('dialog-panel--lightbox');
    expect(host.querySelector('.dialog-title')?.textContent).toContain('FSC COC');
    expect(host.querySelector('.viewer-preview__image')?.getAttribute('src')).toContain(
      'FSC-COC.png',
    );
    expect(host.querySelector('.viewer-counter')?.textContent).toContain('1 / 2');

    (host.querySelector('.viewer-nav--next') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(host.querySelector('.dialog-title')?.textContent).toContain('PEFC');
    expect(host.querySelector('.viewer-preview__image')?.getAttribute('src')).toContain('PEFC.png');
    expect(host.querySelector('.viewer-counter')?.textContent).toContain('2 / 2');

    (host.querySelector('.dialog-body') as HTMLElement).click();
    fixture.detectChanges();

    expect(host.querySelector('.dialog-panel')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('navigates the gallery with vertical wheel gestures', () => {
    const card = host.querySelector('.cert-card') as HTMLButtonElement;

    card.click();
    fixture.detectChanges();

    const gallery = host.querySelector('.viewer-shell') as HTMLElement;

    gallery.dispatchEvent(new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: 90 }));
    fixture.detectChanges();

    expect(host.querySelector('.dialog-title')?.textContent).toContain('PEFC');
    expect(host.querySelector('.viewer-counter')?.textContent).toContain('2 / 2');

    gallery.dispatchEvent(
      new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: -90 }),
    );
    fixture.detectChanges();

    expect(host.querySelector('.dialog-title')?.textContent).toContain('FSC COC');
    expect(host.querySelector('.viewer-counter')?.textContent).toContain('1 / 2');
  });
});
