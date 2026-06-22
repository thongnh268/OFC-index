import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';

import { TabComponent } from './tab.component';
import { TabGroupComponent } from './tab-group.component';

@Component({
  standalone: true,
  imports: [TabGroupComponent, TabComponent],
  template: `
    <app-tab-group groupId="demo">
      <app-tab label="One"><p>First panel</p></app-tab>
      <app-tab label="Two"><p>Second panel</p></app-tab>
      <app-tab label="Three"><p>Third panel</p></app-tab>
    </app-tab-group>
  `,
})
class HostComponent {}

describe('TabGroupComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HTMLElement;

  const triggers = (): HTMLButtonElement[] => Array.from(host.querySelectorAll('[role="tab"]'));
  const panel = (): HTMLElement => host.querySelector('[role="tabpanel"]') as HTMLElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    host = fixture.nativeElement as HTMLElement;
  });

  it('renders one trigger per tab and shows the first panel by default', () => {
    expect(triggers().length).toBe(3);
    expect(triggers()[0].getAttribute('aria-selected')).toBe('true');
    expect(panel().textContent).toContain('First panel');
  });

  it('wires tablist ARIA ids between trigger and panel', () => {
    expect(triggers()[0].id).toBe('demo-tab-0');
    expect(triggers()[0].getAttribute('aria-controls')).toBe('demo-panel-0');
    expect(panel().id).toBe('demo-panel-0');
    expect(panel().getAttribute('aria-labelledby')).toBe('demo-tab-0');
  });

  it('activates a tab on click and swaps the panel content', () => {
    triggers()[1].click();
    fixture.detectChanges();

    expect(triggers()[1].getAttribute('aria-selected')).toBe('true');
    expect(triggers()[0].getAttribute('tabindex')).toBe('-1');
    expect(panel().textContent).toContain('Second panel');
  });

  it('moves with ArrowRight/ArrowLeft (wrapping) and Home/End', () => {
    const fire = (key: string): void => {
      triggers()[0].dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
      fixture.detectChanges();
    };

    fire('ArrowRight');
    expect(triggers()[1].getAttribute('aria-selected')).toBe('true');

    fire('End');
    expect(triggers()[2].getAttribute('aria-selected')).toBe('true');

    fire('ArrowRight'); // wraps to first
    expect(triggers()[0].getAttribute('aria-selected')).toBe('true');

    fire('ArrowLeft'); // wraps back to last
    expect(triggers()[2].getAttribute('aria-selected')).toBe('true');
  });
});
