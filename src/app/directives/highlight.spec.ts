import { ElementRef, Renderer2 } from '@angular/core';
import { Highlight } from './highlight';

describe('Highlight', () => {
  it('should create an instance', () => {
    const el = new ElementRef(document.createElement('div'));
    const renderer = { setStyle: () => {} } as unknown as Renderer2;
    const directive = new Highlight(el, renderer);
    expect(directive).toBeTruthy();
  });
});