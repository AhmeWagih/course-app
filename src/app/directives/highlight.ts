import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class Highlight implements OnChanges {
  // @Input('defaultColor') defColor='red'
  // @Input('appHighlight') highColor='blue'
  @Input() defaultColor = 'red';
  @Input() highlightColor = 'blue';

  constructor(
    private ele: ElementRef,
    private render2: Renderer2,
  ) {
    // ele.nativeElement.style.backgroundColor='#09c'
    // this.render2.setStyle(ele.nativeElement, 'background-color', this.defaultColor)
  }
  ngOnChanges(): void {
    this.render2.setStyle(this.ele.nativeElement, 'background-color', this.defaultColor);
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.render2.setStyle(this.ele.nativeElement, 'background-color', this.highlightColor);
  }

  @HostListener('mouseleave')
  onMouseOut() {
    this.render2.setStyle(this.ele.nativeElement, 'background-color', this.defaultColor);
  }
}
