import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';

@Component({
  standalone: true,
  imports: [PaginationComponent],
  template: `
    <app-pagination
      [totalPages]="totalPages()"
      [currentPage]="currentPage()"
      (pageChanged)="currentPage.set($event)"
    />
  `,
})
class HostComponent {
  readonly totalPages = signal(10);
  readonly currentPage = signal(1);
}

describe('PaginationComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HTMLElement;

  const buttons = (): HTMLButtonElement[] => Array.from(host.querySelectorAll('.page-button'));
  // All .page-button except the first/last (prev/next arrows).
  const numbers = (): string[] =>
    buttons()
      .slice(1, -1)
      .map((button) => button.textContent?.trim() ?? '');

  const render = (current: number, total = 10): void => {
    fixture.componentInstance.totalPages.set(total);
    fixture.componentInstance.currentPage.set(current);
    fixture.detectChanges();
  };

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.nativeElement as HTMLElement;
  });

  it('windows pages around the current one with gaps', () => {
    render(5);
    expect(numbers()).toEqual(['1', '4', '5', '6', '10']);
    expect(host.querySelectorAll('.page-gap').length).toBe(2);
  });

  it('lists every page when the total is small', () => {
    render(2, 3);
    expect(numbers()).toEqual(['1', '2', '3']);
    expect(host.querySelectorAll('.page-gap').length).toBe(0);
  });

  it('marks the current page and disables the matching arrow at each bound', () => {
    render(1);
    const current = host.querySelector('[aria-current="page"]');
    expect(current?.textContent?.trim()).toBe('1');
    expect(buttons()[0].disabled).toBeTrue();

    render(10);
    expect(buttons()[buttons().length - 1].disabled).toBeTrue();
  });

  it('emits pageChanged for pages and arrows, ignoring the current page', () => {
    render(5);
    const five = buttons().find((button) => button.textContent?.trim() === '5');
    five?.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.currentPage()).toBe(5);

    const six = buttons().find((button) => button.textContent?.trim() === '6');
    six?.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.currentPage()).toBe(6);

    buttons()[0].click(); // previous arrow
    fixture.detectChanges();
    expect(fixture.componentInstance.currentPage()).toBe(5);
  });
});
