import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { BadgeDirective } from './badge.directive';
import { ButtonDirective } from './button.directive';
import { CardDirective } from './card.directive';
import { FieldDirective } from './field.directive';

@Component({
  standalone: true,
  imports: [ButtonDirective, FieldDirective, BadgeDirective, CardDirective],
  template: `
    <button appButton>Default</button>
    <a appButton variant="outline" size="sm" href="#">Link</a>
    <input appField />
    <textarea appField></textarea>
    <select appField></select>
    <span appBadge>Default badge</span>
    <span appBadge variant="neutral">Neutral</span>
    <div appCard>Padded card</div>
    <div appCard [padded]="false">Bare card</div>
  `,
})
class HostComponent {}

describe('shared style-carrier directives', () => {
  const render = (): HTMLElement => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  };

  it('appButton applies primary md classes by default', () => {
    const button = render().querySelector('button');
    expect(button?.className).toContain('btn');
    expect(button?.className).toContain('btn-primary');
    expect(button?.className).not.toContain('btn-sm');
  });

  it('appButton applies variant and size on anchors too', () => {
    const anchor = render().querySelector('a');
    expect(anchor?.className).toContain('btn-outline');
    expect(anchor?.className).toContain('btn-sm');
  });

  it('appField marks input, textarea and select with the field class', () => {
    const host = render();
    for (const tag of ['input', 'textarea', 'select']) {
      expect(host.querySelector(tag)?.classList).toContain('field');
    }
  });

  it('appBadge applies the variant class', () => {
    const [primary, neutral] = Array.from(render().querySelectorAll('span'));
    expect(primary.className).toContain('badge-primary');
    expect(neutral.className).toContain('badge-neutral');
  });

  it('appCard pads by default and supports bare surfaces', () => {
    const [padded, bare] = Array.from(render().querySelectorAll('div[appCard], div.card'));
    expect(padded.className).toContain('card-padded');
    expect(bare.className).not.toContain('card-padded');
  });
});
