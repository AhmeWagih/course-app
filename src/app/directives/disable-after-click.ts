import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: 'button[appDisableAfterClick]',
})
export class DisableAfterClick {
  private originalText = '';
  private originalCursor = '';

  constructor(private el: ElementRef<HTMLButtonElement>, private renderer: Renderer2) {}

  @HostListener('click')
  onClick(): void {
    const button = this.el.nativeElement;
    if (button.disabled) return;
    this.originalText = button.textContent?.trim() ?? '';
    this.originalCursor = button.style.cursor || '';
    this.renderer.setProperty(button, 'disabled', true);
    this.renderer.setStyle(button, 'cursor', 'not-allowed');
    this.renderer.setProperty(button, 'textContent', 'Processing...');
    setTimeout(() => {
      this.renderer.setProperty(button, 'disabled', false);
      this.renderer.setProperty(button, 'textContent', this.originalText || 'Submit');
      this.renderer.setStyle(button, 'cursor', this.originalCursor || 'pointer');
    }, 3000);
  }
}
