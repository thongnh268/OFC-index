import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortableTextComponent } from './portable-text.component';
import type { PortableTextNode } from '../../../core/sanity';

describe('PortableTextComponent', () => {
  let fixture: ComponentFixture<PortableTextComponent>;
  let el: HTMLElement;

  const render = (value: readonly PortableTextNode[]): void => {
    fixture.componentRef.setInput('value', value);
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [PortableTextComponent] }).compileComponents();
    fixture = TestBed.createComponent(PortableTextComponent);
    el = fixture.nativeElement as HTMLElement;
  });

  it('renders nothing for an empty body', () => {
    render([]);
    expect(el.querySelector('p, h2, h3, ul, ol, figure')).toBeNull();
  });

  it('maps block styles to semantic tags', () => {
    render([
      {
        _type: 'block',
        _key: '1',
        style: 'h2',
        children: [{ _type: 'span', _key: 's', text: 'Title' }],
      },
      {
        _type: 'block',
        _key: '2',
        style: 'h3',
        children: [{ _type: 'span', _key: 's', text: 'Sub' }],
      },
      {
        _type: 'block',
        _key: '3',
        style: 'blockquote',
        children: [{ _type: 'span', _key: 's', text: 'Q' }],
      },
      {
        _type: 'block',
        _key: '4',
        style: 'normal',
        children: [{ _type: 'span', _key: 's', text: 'Body' }],
      },
    ]);
    expect(el.querySelector('h2')?.textContent?.trim()).toBe('Title');
    expect(el.querySelector('h3')?.textContent?.trim()).toBe('Sub');
    expect(el.querySelector('blockquote')?.textContent?.trim()).toBe('Q');
    expect(el.querySelector('p')?.textContent?.trim()).toBe('Body');
  });

  it('renders strong and em decorators', () => {
    render([
      {
        _type: 'block',
        _key: '1',
        style: 'normal',
        children: [
          { _type: 'span', _key: 'a', text: 'bold', marks: ['strong'] },
          { _type: 'span', _key: 'b', text: 'it', marks: ['em'] },
        ],
      },
    ]);
    expect(el.querySelector('strong')?.textContent?.trim()).toBe('bold');
    expect(el.querySelector('em')?.textContent?.trim()).toBe('it');
  });

  it('renders an external link with target/rel from a markDef', () => {
    render([
      {
        _type: 'block',
        _key: '1',
        style: 'normal',
        markDefs: [{ _type: 'link', _key: 'L', href: 'https://example.com' }],
        children: [{ _type: 'span', _key: 's', text: 'go', marks: ['L'] }],
      },
    ]);
    const a = el.querySelector('a');
    expect(a?.getAttribute('href')).toBe('https://example.com');
    expect(a?.getAttribute('target')).toBe('_blank');
    expect(a?.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('does not set target/rel on a relative link', () => {
    render([
      {
        _type: 'block',
        _key: '1',
        style: 'normal',
        markDefs: [{ _type: 'link', _key: 'L', href: '/products' }],
        children: [{ _type: 'span', _key: 's', text: 'go', marks: ['L'] }],
      },
    ]);
    const a = el.querySelector('a');
    expect(a?.getAttribute('href')).toBe('/products');
    expect(a?.getAttribute('target')).toBeNull();
  });

  it('collapses consecutive bullet items into one <ul>', () => {
    render([
      {
        _type: 'block',
        _key: '1',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', _key: 's', text: 'one' }],
      },
      {
        _type: 'block',
        _key: '2',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', _key: 's', text: 'two' }],
      },
    ]);
    expect(el.querySelectorAll('ul').length).toBe(1);
    expect(el.querySelectorAll('ul li').length).toBe(2);
  });

  it('keeps bullet and numbered runs as separate lists', () => {
    render([
      {
        _type: 'block',
        _key: '1',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', _key: 's', text: 'b' }],
      },
      {
        _type: 'block',
        _key: '2',
        style: 'normal',
        listItem: 'number',
        children: [{ _type: 'span', _key: 's', text: 'n' }],
      },
    ]);
    expect(el.querySelectorAll('ul').length).toBe(1);
    expect(el.querySelectorAll('ol').length).toBe(1);
  });

  it('renders an inline image with src and alt', () => {
    render([{ _type: 'image', _key: 'i', url: 'https://cdn.test/x.jpg', alt: 'pic' }]);
    const img = el.querySelector('figure img');
    expect(img?.getAttribute('src')).toBe('https://cdn.test/x.jpg');
    expect(img?.getAttribute('alt')).toBe('pic');
  });
});
